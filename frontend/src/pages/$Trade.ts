import { Behavior, combineArray, combineObject, O, replayLatest } from "@aelea/core"
import { $node, $text, component, eventElementTarget, INode, nodeEvent, style, styleBehavior, styleInline } from "@aelea/dom"
import { Route } from "@aelea/router"
import { $column, $row, layoutSheet, screenUtils, state } from "@aelea/ui-components"
import {
  AddressZero, ARBITRUM_ADDRESS, ARBITRUM_ADDRESS_LEVERAGE, formatFixed, intervalTimeMap, IPricefeed, IPricefeedParamApi, IPriceLatestMap, isTradeOpen, ITrade, unixTimestampNow, IRequestTradeQueryparam, getChainName,
  ITradeOpen, CHAIN_TOKEN_ADDRESS_TO_SYMBOL, TradeAddress, ARBITRUM_ADDRESS_TRADE, BASIS_POINTS_DIVISOR, getAveragePriceFromDelta, getDelta,
  getLiquidationPrice, getMarginFees, getTokenUsd, STABLE_SWAP_FEE_BASIS_POINTS, STABLE_TAX_BASIS_POINTS, SWAP_FEE_BASIS_POINTS, TAX_BASIS_POINTS, replayState, getDenominator, USD_PERCISION, periodicRun, formatReadableUSD, timeSince, IVaultPosition, getPositionKey, listen
} from "@gambitdao/gmx-middleware"

import { IWalletLink, parseError } from "@gambitdao/wallet-link"
import { combine, constant, map, mergeArray, multicast, periodic, scan, skipRepeats, switchLatest, debounce, empty, skip, now, startWith, fromPromise, snapshot, take, filter } from "@most/core"
import { colorAlpha, pallete } from "@aelea/ui-components-theme"
import { $alert, $arrowsFlip, $IntermediatePromise, $Link, $ProfitLossText, $RiskLiquidator, $spinner, $txHashRef } from "@gambitdao/ui-components"
import { CandlestickData, CrosshairMode, LineStyle, Time } from "lightweight-charts"
import { IEthereumProvider } from "eip1193-provider"
import { Stream } from "@most/types"
import { WALLET, web3Provider } from "../logic/provider"
import { connectPricefeed, connectTrade, connectVault, getErc20Balance, KeeperExecutePosition } from "../logic/contract/trade"
import { $TradeBox } from "../components/trade/$TradeBox"
import { BLUEBERRY_REFFERAL_CODE, GLOBAL_W3P, USE_CHAIN } from "@gambitdao/gbc-middleware"
import { $ButtonToggle } from "../common/$Toggle"
import { $Table2 } from "../common/$Table2"
import { $Entry, $livePnl } from "./$Leaderboard"
import { $iconCircular } from "../elements/$common"
import { $CandleSticks } from "../components/chart/$CandleSticks"
import { CHAIN_NATIVE_TO_ADDRESS, getFeeBasisPoints, getTokenDescription, resolveLongPath } from "../components/trade/utils"
import { BrowserStore } from "../logic/store"
import { ContractReceipt, ContractTransaction } from "@ethersproject/contracts"
import { $seperator2 } from "./common"
import { PositionRouter__factory } from "../logic/contract/gmx-contracts"


export interface ITradeComponent {
  store: BrowserStore<string, "ROOT">
  parentRoute: Route
  accountTradeList: Stream<ITrade[]>
  trade: Stream<ITradeOpen | null>
  walletLink: IWalletLink
  walletStore: state.BrowserStore<WALLET, "walletStore">
  pricefeed: Stream<IPricefeed[]>
  latestPriceMap: Stream<IPriceLatestMap>
}

export const $Trade = (config: ITradeComponent) => component((
  [selectTimeFrame, selectTimeFrameTether]: Behavior<intervalTimeMap, intervalTimeMap>,
  [changeRoute, changeRouteTether]: Behavior<string, string>,
  [walletChange, walletChangeTether]: Behavior<IEthereumProvider, IEthereumProvider>,

  [changeInputToken, changeInputTokenTether]: Behavior<TradeAddress, TradeAddress>,
  [changeIndexToken, changeIndexTokenTether]: Behavior<ARBITRUM_ADDRESS_LEVERAGE, ARBITRUM_ADDRESS_LEVERAGE>,
  [changeCollateralToken, changeCollateralTokenTether]: Behavior<ARBITRUM_ADDRESS_TRADE, ARBITRUM_ADDRESS_TRADE>,
  [switchIsLong, switchIsLongTether]: Behavior<boolean, boolean>,
  [switchIsIncrease, switchIsIncreaseTether]: Behavior<boolean, boolean>,
  // [changeFocusFactor, changeFocusFactorTether]: Behavior<number, number>,
  [changeCollateral, changeCollateralTether]: Behavior<bigint, bigint>,
  // [slideCollateralRatio, slideCollateralRatioTether]: Behavior<number, number>,

  [changeSize, changeSizeTether]: Behavior<bigint, bigint>,
  [changeLeverage, changeLeverageTether]: Behavior<number, number>,
  [changeCollateralRatio, changeCollateralRatioTether]: Behavior<number, number>,

  [switchTrade, switchTradeTether]: Behavior<INode, ITrade>,
  [requestTrade, requestTradeTether]: Behavior<PointerEvent, PointerEvent>,
) => {


  const pricefeed = connectPricefeed(config.walletLink)
  const vault = connectVault(config.walletLink)
  const trade = connectTrade(config.walletLink)
  const executionFee = multicast(trade.executionFee)

  const chain = USE_CHAIN


  const tradingStore = config.store.craete('trade', 'tradeBox')

  const timeFrameStore = tradingStore.craete('portfolio-chart-interval', intervalTimeMap.MIN60)

  const isLongStore = tradingStore.craete('isLong', true)
  const inputTokenStore = tradingStore.craete<TradeAddress, 'depositToken'>('depositToken', AddressZero)
  const collateralTokenStore = tradingStore.craete<ARBITRUM_ADDRESS_TRADE, 'collateralToken'>('collateralToken', ARBITRUM_ADDRESS.NATIVE_TOKEN)
  const indexTokenStore = tradingStore.craete<ARBITRUM_ADDRESS_LEVERAGE, 'indexToken'>('indexToken', ARBITRUM_ADDRESS.NATIVE_TOKEN)
  const isIncreaseStore = tradingStore.craete('isIncrease', true)
  const collateralRatioStore = tradingStore.craete('collateralRatio', 0)



  const timeframe = replayLatest(timeFrameStore.store(selectTimeFrame, map(x => x)), timeFrameStore.state)

  const isLong = replayLatest(isLongStore.store(mergeArray([map(t => t.isLong, switchTrade), switchIsLong]), map(x => x)), isLongStore.state)
  const isIncrease = replayLatest(isIncreaseStore.store(switchIsIncrease, map(x => x)), isIncreaseStore.state)
  const inputToken = replayLatest(inputTokenStore.store(changeInputToken, map(x => x)), inputTokenStore.state)

  const walletBalance = replayLatest(skipRepeats(multicast(switchLatest(combineArray((token, w3p, account) => {
    return periodicRun({
      interval: 5000,
      recoverError: false,
      // startImmediate: true,
      actionOp: map(async () => getErc20Balance(token, w3p, account))
    })
  }, inputToken, config.walletLink.provider, config.walletLink.account)))))

  const collateralToken = replayLatest(collateralTokenStore.store(mergeArray([map(t => t.collateralToken, switchTrade), changeCollateralToken]), map(x => x)), collateralTokenStore.state)
  const indexToken = replayLatest(indexTokenStore.store(mergeArray([map(t => t.indexToken, switchTrade), changeIndexToken]), map(x => x)), indexTokenStore.state)

  const collateral = replayLatest(changeCollateral, 0n)
  const size = replayLatest(changeSize, 0n)

  const collateralRatio = replayLatest(changeCollateralRatio, 0)
  // const collateralRatio = replayLatest(collateralRatioStore.store(changeCollateralRatio, map(x => x)), collateralRatioStore.state)
  const leverage = replayLatest(changeLeverage, 0)


  const tradeParams = { isLong, isIncrease, inputToken, collateralToken, indexToken, leverage, collateral, size, collateralRatio, }
  const tradeParamsState = replayState(tradeParams)


  const inputTokenPrice = replayLatest(skipRepeats(switchLatest(map(address => pricefeed.getLatestPrice(address), inputToken))))
  const indexTokenPrice = replayLatest(skipRepeats(switchLatest(map(address => pricefeed.getLatestPrice(address), indexToken))))
  const collateralTokenPrice = replayLatest(skipRepeats(switchLatest(map(address => pricefeed.getLatestPrice(address), collateralToken))))




  const inputTokenWeight = switchLatest(map(address => {
    if (address === AddressZero) {
      return vault.getTokenWeight(CHAIN_NATIVE_TO_ADDRESS[USE_CHAIN])
    }

    return vault.getTokenWeight(address)
  }, inputToken))

  const inputTokenDebtUsd = switchLatest(map(address => {
    if (address === AddressZero) {
      return vault.getTokenDebtUsd(CHAIN_NATIVE_TO_ADDRESS[USE_CHAIN])
    }

    return vault.getTokenDebtUsd(address)
  }, inputToken))

  const indexTokenWeight = switchLatest(map(address => vault.getTokenWeight(address), indexToken))
  const indexTokenDebtUsd = switchLatest(map(address => vault.getTokenDebtUsd(address), indexToken))
  // const indexTokenCumulativeFundingRate = switchLatest(map(address => vault.getTokenCumulativeFundingRate(address), indexToken))


  const inputTokenDescription = map(address => getTokenDescription(USE_CHAIN, address), inputToken)
  const indexTokenDescription = map(address => getTokenDescription(USE_CHAIN, address), indexToken)
  const collateralTokenDescription = map(address => getTokenDescription(USE_CHAIN, address), collateralToken)


  const requestPosition = debounce(50, combineObject({ account: config.walletLink.account, collateralToken, indexToken, isLong }))


  const positionKey = replayLatest(multicast(map(params => {
    if (!params.account) {
      return null
    }

    // const nomCollateralToken = params.collateralToken === AddressZero ? CHAIN_NATIVE_TO_ADDRESS[USE_CHAIN] : params.collateralToken
    const key = getPositionKey(params.account, params.collateralToken, params.indexToken, params.isLong)

    return key
  }, requestPosition)))

  const vaultPosition = replayLatest(multicast(switchLatest(map((key): Stream<IVaultPosition | null> => {
    if (!key) {
      return now(null)
    }

    const position = vault.getPosition(key)
    return position
  }, positionKey))))


  const swapFee = skipRepeats(combineArray((usdgSupply, totalTokenWeight, tradeParams, vaultPosition, inputTokenDebtUsd, inputTokenWeight, inputTokenDescription, inputTokenPrice, indexTokenDebtUsd, indexTokenWeight, indexTokenDescription, indexTokenPrice) => {
    const swapFeeBasisPoints = inputTokenDescription.isStable && indexTokenDescription.isStable ? STABLE_SWAP_FEE_BASIS_POINTS : SWAP_FEE_BASIS_POINTS
    const taxBasisPoints = inputTokenDescription.isStable && indexTokenDescription.isStable ? STABLE_TAX_BASIS_POINTS : TAX_BASIS_POINTS

    const swapTokenNorm = tradeParams.inputToken === AddressZero ? CHAIN_NATIVE_TO_ADDRESS[USE_CHAIN] : tradeParams.inputToken

    if (swapTokenNorm === tradeParams.indexToken) {
      return 0n
    }

    const adjustedPnlDelta = !tradeParams.isIncrease && vaultPosition && vaultPosition.size > 0n
      ? getDelta(vaultPosition.averagePrice, indexTokenPrice, vaultPosition.size) * tradeParams.size / vaultPosition.size
      : 0n
    const amountUsd = getTokenUsd(tradeParams.collateral, inputTokenPrice, inputTokenDescription.decimals) + adjustedPnlDelta

    const usdgAmount = amountUsd * getDenominator(inputTokenDescription.decimals) / USD_PERCISION

    const feeBps0 = getFeeBasisPoints(
      inputTokenDebtUsd,
      inputTokenWeight,
      usdgAmount,
      swapFeeBasisPoints,
      taxBasisPoints,
      true,
      usdgSupply,
      totalTokenWeight
    )
    const feeBps1 = getFeeBasisPoints(
      indexTokenDebtUsd,
      indexTokenWeight,
      usdgAmount,
      swapFeeBasisPoints,
      taxBasisPoints,
      false,
      usdgSupply,
      totalTokenWeight
    )

    const feeBps = feeBps0 > feeBps1 ? feeBps0 : feeBps1
    const addedSwapFee = feeBps ? amountUsd * feeBps / BASIS_POINTS_DIVISOR : 0n

    return addedSwapFee
  }, vault.usdgSupply, vault.totalTokenWeight, tradeParamsState, vaultPosition, inputTokenDebtUsd, inputTokenWeight, inputTokenDescription, inputTokenPrice, indexTokenDebtUsd, indexTokenWeight, indexTokenDescription, indexTokenPrice))

  const marginFee = combineArray((isIncrease, size) => isIncrease ? getMarginFees(size) : 0n, isIncrease, size)

  const fee = combine((swap, margin) => swap + margin, swapFee, marginFee)

  // const minCollateralRatio = map(state => {
  //   if (!state.isIncrease) {
  //     return 0n
  //   }

  //   const walletBalance = getTokenUsd(state.walletBalance, state.inputTokenPrice, state.inputTokenDescription.decimals)
  //   const posCollateral = state.vaultPosition?.collateral || 0n

  //   return div(walletBalance, walletBalance + posCollateral)
  //   // return bnDiv(minCollateral, ttlColalteral)
  // }, combineObject({ isIncrease, inputTokenPrice, walletBalance, inputTokenDescription, vaultPosition }))


  const collateralUsd = multicast(map(params => {
    if (params.isIncrease) {
      return getTokenUsd(params.collateral, params.inputTokenPrice, params.inputTokenDescription.decimals)
    }

    if (!params.vaultPosition) {
      return 0n
    }

    // const pnl = getDelta(params.vaultPosition.averagePrice, params.indexTokenPrice, params.vaultPosition.size)
    // const adjustedPnlDelta = pnl * params.size / params.vaultPosition.size

    // const ratio = BigInt(Math.floor(Math.abs(params.collateralRatio) * Number(BASIS_POINTS_DIVISOR)))

    // const adjCollateral = adjustedPnlDelta * ratio / BASIS_POINTS_DIVISOR

    const withdrawCollateral = getTokenUsd(params.collateral, params.inputTokenPrice, params.inputTokenDescription.decimals)

    return withdrawCollateral // - adjustedPnlDelta
  }, combineObject({ isIncrease, inputTokenPrice, vaultPosition: vaultPosition, inputTokenDescription, indexTokenPrice, collateralRatio, collateral, size, fee: startWith(0n, fee) })))


  const averagePrice = map(params => {
    if (!params.vaultPosition) {
      return null
    }

    const nextAveragePrice = params.isIncrease
      ? getAveragePriceFromDelta(getDelta(params.vaultPosition.averagePrice, params.indexTokenPrice, params.vaultPosition.size), params.vaultPosition.size, params.indexTokenPrice, params.size)
      : params.vaultPosition.averagePrice

    return nextAveragePrice

  }, combineObject({ vaultPosition, isIncrease, indexTokenPrice, size }))

  const liquidationPrice = map(params => {
    if (params.averagePrice === null && params.collateralUsd > 0n && params.size > 0n) {
      return getLiquidationPrice(params.collateralUsd, params.size, params.indexTokenPrice, params.isLong)
    }

    if (params.averagePrice === null || !params.vaultPosition || !params.isIncrease && params.size === params.vaultPosition.size) {
      return null
    }

    const sizeDelta = params.isIncrease ? params.size : -params.size
    const collateralDelta = params.isIncrease ? params.collateralUsd : -params.collateralUsd


    const collateral = params.vaultPosition.collateral + collateralDelta
    const size = params.vaultPosition.size + sizeDelta

    return getLiquidationPrice(collateral, size, params.averagePrice, params.vaultPosition.isLong)
  }, combineObject({ vaultPosition, isIncrease, collateralUsd, size, averagePrice, indexTokenPrice, isLong }))


  const $container = screenUtils.isDesktopScreen
    ? $row(style({ flexDirection: 'row-reverse', gap: '70px' }))
    : $column

  const chartContainerStyle = style({
    backgroundImage: `radial-gradient(at right center, ${pallete.background} 50%, transparent)`,
    background: pallete.background
  })
  const $chartContainer = $column(chartContainerStyle)(screenUtils.isDesktopScreen
    ? O(
      style({
        position: 'fixed', flexDirection: 'column', inset: '120px 0px 0px', width: 'calc(50vw)', borderRight: `1px solid rgba(191, 187, 207, 0.15)`,
        display: 'flex'
      }),
      styleInline(map(interesction => {

        const target = interesction.target

        if (target instanceof HTMLElement) {
          return { inset: `${120 - Math.min(120, target.scrollTop)}px 120px 0px 0px` }
        } else {
          throw new Error('scroll target is not an elemnt')
        }

      }, eventElementTarget('scroll', document.body.children[0])))
    ) : O()
  )



  const timeFrameLabl = {
    [intervalTimeMap.MIN5]: '5m',
    [intervalTimeMap.MIN15]: '15m',
    [intervalTimeMap.MIN60]: '1h',
    [intervalTimeMap.HR4]: 'h4',
    [intervalTimeMap.HR24]: '1d',
    [intervalTimeMap.DAY7]: '1w',
  }



  const requestAccountTradeList = multicast(map((address) => {
    return {
      account: address,
      // timeInterval: timeFrameStore.state,
      chain,
    }
  }, config.walletLink.account)

  )
  const requestPricefeed = multicast(combine((tokenAddress, selectedInterval): IPricefeedParamApi => {
    const range = selectedInterval * 1000

    const to = unixTimestampNow()
    const from = to - range

    const interval = selectedInterval

    return { chain, interval, tokenAddress, from, to }
  }, indexToken, timeframe))

  const historicActionList = map(trade => {
    if (trade === null) {
      return []
    }

    return [...trade.increaseList, ...trade.decreaseList].sort((a, b) => b.timestamp - a.timestamp)
  }, config.trade)

  const requestTradeMulticast = replayLatest(multicast(snapshot(async (params) => {
    const path = resolveLongPath(params.inputToken, params.indexToken)

    // const queryCtx = params.inputToken === AddressZero
    //   ? params.trade.createIncreasePositionETH(
    //     path,
    //     params.indexToken,
    //     0,
    //     params.size,
    //     params.isLong,
    //     params.indexTokenPrice,
    //     params.executionFee,
    //     BLUEBERRY_REFFERAL_CODE,
    //     { value: params.collateral + params.executionFee }
    //   )
    //   : params.trade.createIncreasePosition(
    //     path,
    //     params.indexToken,
    //     params.collateral,
    //     0,
    //     params.size,
    //     params.isLong,
    //     params.indexTokenPrice,
    //     params.executionFee,
    //     BLUEBERRY_REFFERAL_CODE,
    //     { value: params.executionFee }
    //   )

    // Request increase BTC Long, +91,785.01 USD, Acceptable Price: < 18,747.42 USD


    const txstub = new Promise((resolve) => setTimeout(() => resolve({}), 1000))
    

    const ctx = await txstub
    // const ctx = await queryCtx
    // const crp = await ctx.wait()

    const account = await params.trade.signer.getAddress()

    return { ctx, params, account }
  }, combineObject({ isLong, indexToken, inputToken, isIncrease, indexTokenDescription, size, indexTokenPrice, executionFee, collateral, trade: trade.contract }), requestTrade)))




  return [
    $container(style({
      fontFeatureSettings: '"tnum" on,"lnum" on', fontFamily: `-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif`,

      // fontFamily: '-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif'
    }))(
      $column(layoutSheet.spacingBig, style({ flex: 1 }))(

        // style({ alignSelf: 'center' })(
        //   $alert(
        //     $column(layoutSheet.spacingTiny)(
        //       $text('Work in Progress. please use with caution'),
        //       $anchor(attr({ href: 'https://app.gmx.io/#/trade' }))(
        //         $text('got issues? positons can also be modified in gmx.io')
        //       )
        //     )
        //   )
        // ),

        $TradeBox({
          chain,
          walletStore: config.walletStore,
          walletLink: config.walletLink,
          store: tradingStore,

          tradeParams,
          state: {
            trade: config.trade,
            vaultPosition,
            collateralUsd,
            inputTokenPrice,
            indexTokenPrice,
            collateralTokenPrice,
            collateralTokenDescription,
            fee,
            indexTokenDescription,
            inputTokenDescription,
            marginFee,
            swapFee,
            averagePrice,
            liquidationPrice,
            // validationError,
            walletBalance,
          },

        })({
          leverage: changeLeverageTether(),
          switchIsIncrease: switchIsIncreaseTether(),
          changeCollateral: changeCollateralTether(),
          // changeCollateralUsd: changeCollateralUsdTether(),
          changeSize: changeSizeTether(),
          changeInputToken: changeInputTokenTether(),
          changeCollateralToken: changeCollateralTokenTether(),
          changeIndexToken: changeIndexTokenTether(),
          // changeWithdrawCollateralToken: changeWithdrawCollateralTokenTether(),
          // focusFactor: changeFocusFactorTether(),
          switchIsLong: switchIsLongTether(),
          changeCollateralRatio: changeCollateralRatioTether(),
          // slideCollateralRatio: slideCollateralRatioTether(),

          requestTrade: requestTradeTether(),

          walletChange: walletChangeTether()
        }),

        $node(),

        $IntermediatePromise({
          clean: combineObject(tradeParams),
          query: requestTradeMulticast,
          $$done: snapshot((key, req) => {
            if (!key) {
              throw new Error('no position key')
            }

            const contract = PositionRouter__factory.connect(ARBITRUM_ADDRESS.PositionRouter, web3Provider)

            req.params.trade.signer.getAddress()

            const createIncreasePosition: Stream<KeeperExecutePosition> = mergeArray([listen(req.params.trade)('ExecuteIncreasePosition'), listen(contract)('ExecuteIncreasePosition')])
            const createDecreasePosition: Stream<KeeperExecutePosition> = mergeArray([listen(req.params.trade)('ExecuteDecreasePosition'), listen(contract)('ExecuteDecreasePosition')])

            const failExecutePosition: Stream<KeeperExecutePosition> = mergeArray([
              listen(req.params.trade)('CancelIncreasePosition'),
              listen(req.params.trade)('CancelDecreasePosition'),
              listen(contract)('CancelIncreasePosition'),
              listen(contract)('CancelDecreasePosition'),
            ])


            const allExs = take(1, filter(pos => {
              debugger
              return pos.account === req.account
            }, mergeArray([
              // createIncreasePosition,
              // createDecreasePosition,
              failExecutePosition,
            ])))

            const awaitExecuteIncreasePosition: Stream<KeeperExecutePosition> = listen(req.params.trade)('CreateDecreasePosition')

            return $column(
              $row(layoutSheet.spacingSmall, style({ color: pallete.positive }))(
                $text(style({ color: pallete.positive }))('Tx Succeeded'),
                // $txHashRef(req.crp.transactionHash, chain)
              ),
              $seperator2,
              $row(layoutSheet.spacingSmall, style({ color: pallete.positive }))(
                $text(style({ color: pallete.positive }))('Requesting '),
                switchLatest(map(params => {

                  const { acceptablePrice, account, amountIn, blockGap, executionFee, indexToken, isLong, minOut, path, sizeDelta, timeGap } = params

                  console.log(params)
                  const actionName = req.params.isIncrease ? 'increase' : 'reduce'
                  const message = `Request ${actionName} ${req.params.indexTokenDescription.symbol} ${formatReadableUSD(req.params.size)} @ ${formatReadableUSD(acceptablePrice)}`

                  return $text(message)
                }, allExs))
              ),

            )
          }, positionKey),
          $loader: switchLatest(map(req => {



            return $row(layoutSheet.spacingSmall, style({ alignItems: 'center' }))(
              $spinner,
              $text(startWith('Awaiting wallet approval', map(() => 'Confirming Tx...', fromPromise(req)))),
              $node(style({ flex: 1 }))(),
              // switchLatest(map(txHash => $txHashRef(txHash.ctx.hash, chain), fromPromise(req)))
            )
          }, requestTradeMulticast)),
          $$fail: map(res => {
            const error = parseError(res)

            return $alert($text(error.message))
          }),
        })({}),

        // $IntermediatePromise({
        //   query: requestTrade,
        //   $loader: switchLatest(combineArray(c => {

        //     return $row(layoutSheet.spacingSmall, style({ alignItems: 'center' }))(
        //       $spinner,
        //       $text(startWith('Awaiting wallet approval', map(() => 'Awaiting confirmation...', fromPromise(c)))),
        //       $node(style({ flex: 1 }))(),
        //       switchLatest(map(txHash => $txHashRef(txHash.hash, chain), fromPromise(c)))
        //     )
        //   }, multicastQuery)),
        //   clean: combineObject(tradeParams),
        // })({}),

        $Table2({
          dataSource: historicActionList,
          bodyContainerOp: layoutSheet.spacing,
          scrollConfig: {
            containerOps: O(layoutSheet.spacingBig)
          },
          columns: [
            {
              $head: $text('Timestamp'),
              columnOp: O(style({ flex: 1 })),

              $body: map((pos) => {
                return $column(layoutSheet.spacingTiny, style({ fontSize: '.65em' }))(
                  $text(timeSince(pos.timestamp)),
                  $text(new Date(pos.timestamp * 1000).toLocaleDateString()),
                )
              })
            },
            // {
            //   $head: $text('Action'),
            //   columnOp: O(style({ flex: 1.2 })),

            //   $body: map((pos) => {
            //     const $container = $row(layoutSheet.spacing, style({ alignItems: 'center' }))

            //     const actionType = pos.__typename === "DecreasePosition"
            //       ? pos.collateralDelta === 0n ? actionList.indexOf(pos) === 0 ? pos.fee === 0n ? 'Liquidated' : 'Close' : 'Decrease' : 'Decrease'
            //       : actionList.indexOf(pos) === actionList.length - 1 ? 'Open' : 'Increase'

            //     const [_, txHash] = pos.id.split(':')
            //     return $container(
            //       $text(actionType),
            //       $anchor(attr({ href: getTxExplorerUrl(chain, txHash) }))(
            //         $icon({ $content: $ethScan, width: '16px', viewBox: '0 0 24 24' })
            //       )
            //     )
            //   })
            // },
            // {
            //   $head: $text('Collateral Delta'),
            //   columnOp: O(style({ flex: 1.2 })),
            //   $body: map((pos) => {

            //     if (pos.collateralDelta === 0n) {
            //       return $text('')
            //     }

            //     const $token = $TokenIndex(TOKEN_ADDRESS_TO_SYMBOL[pos.collateralToken], { width: '18px' })
            //     const $container = $row(layoutSheet.spacingTiny, style({ alignItems: 'center' }))
            //     const isDecrease = pos.__typename === "DecreasePosition"

            //     return $container(
            //       $token,
            //       $ProfitLossText(isDecrease ? -pos.collateralDelta : pos.collateralDelta, false),
            //     )
            //   })
            // },
            {
              $head: $text('Size Delta'),
              columnOp: O(style({ flex: 1.2 })),

              $body: map((pos) => {

                const isDecrease = pos.__typename === "DecreasePosition"

                return $row(layoutSheet.spacing, style({ alignItems: 'center' }))(
                  $ProfitLossText(isDecrease ? -pos.sizeDelta : pos.sizeDelta, false),
                )
              })
            },
            {
              $head: $text('Market Price'),
              columnOp: O(style({ flex: .5 })),

              $body: map((pos) => {

                return $row(layoutSheet.spacing, style({ alignItems: 'center' }))(
                  $text(formatReadableUSD(pos.price)),
                )
              })
            },
          ]
        })({})



      ),
      $column(style({ position: 'relative', flex: 1 }))(
        $chartContainer(
          $row(layoutSheet.spacing, style({ fontSize: '0.85em', position: 'absolute', padding: '8px', placeContent: 'center' }))(
            $ButtonToggle({
              selected: timeframe,
              options: [
                intervalTimeMap.MIN5,
                intervalTimeMap.MIN15,
                intervalTimeMap.MIN60,
                intervalTimeMap.HR4,
                intervalTimeMap.HR24,
                intervalTimeMap.DAY7,
              ],
              $$option: map(option => {
                // @ts-ignore
                const newLocal: string = timeFrameLabl[option]

                return $text(newLocal)
              })
            })({ select: selectTimeFrameTether() }),
          ),


          $column(style({ zIndex: -1, flex: 1 }))(
            $row(style({ position: 'relative', flex: 1 }))(
              $CandleSticks({
                series: [
                  {
                    seriesConfig: {
                      upColor: pallete.foreground,
                      downColor: 'transparent',
                      priceLineColor: pallete.message,
                      baseLineStyle: LineStyle.LargeDashed,
                      borderDownColor: pallete.foreground,
                      borderUpColor: pallete.foreground,
                      wickDownColor: pallete.foreground,
                      wickUpColor: pallete.foreground,
                    },
                    priceLines: [
                      map(val => {
                        if (val === null) {
                          return null
                        }

                        return {
                          price: formatFixed(val, 30),
                          color: pallete.middleground,
                          lineVisible: true,
                          lineWidth: 1,
                          axisLabelVisible: true,
                          title: `Entry`,
                          lineStyle: LineStyle.SparseDotted,
                        }
                      }, averagePrice),
                      map(val => {
                        if (val === null) {
                          return null
                        }

                        return {
                          price: formatFixed(val, 30),
                          color: pallete.negative,
                          lineVisible: true,
                          lineWidth: 1,
                          axisLabelVisible: true,
                          title: `Liquidation`,
                          lineStyle: LineStyle.SparseDotted,
                        }
                      }, liquidationPrice)

                    ],
                    appendData: map(data => {
                      if (data === null) {
                        return empty()
                      }
                      const lastData = data[data.length - 1]

                      if (!('open' in lastData)) {
                        return empty()
                      }

                      return skip(1, scan((prev, params): CandlestickData => {
                        const prevTimeSlot = Math.floor(prev.time as number / params.timeframe)
                        const nextTimeSlot = Math.floor(unixTimestampNow() / params.timeframe)
                        const marketPrice = formatFixed(params.indexTokenPrice, 30)
                        const time = nextTimeSlot * params.timeframe as Time

                        const isNext = nextTimeSlot > prevTimeSlot

                        if (isNext) {
                          return {
                            open: marketPrice,
                            high: marketPrice,
                            low: marketPrice,
                            close: marketPrice,
                            time
                          }
                        }

                        return {
                          open: prev.open,
                          high: marketPrice > prev.high ? marketPrice : prev.high,
                          low: marketPrice < prev.low ? marketPrice : prev.low,
                          close: marketPrice,
                          time
                        }
                      }, lastData, combineObject({ indexTokenPrice, timeframe })))
                    }),
                    data: combineArray(data => {
                      //   priceScale.applyOptions({
                      //     scaleMargins: screenUtils.isDesktopScreen
                      //       ? {
                      //         top: 0.3,
                      //         bottom: 0.3
                      //       }
                      //       : {
                      //         top: 0.1,
                      //         bottom: 0.1
                      //       }
                      //   })

                      return data.map(({ o, h, l, c, timestamp }) => {
                        const open = formatFixed(o, 30)
                        const high = formatFixed(h, 30)
                        const low = formatFixed(l, 30)
                        const close = formatFixed(c, 30)

                        return { open, high, low, close, time: timestamp as Time }
                      })
                    }, config.pricefeed),
                    // drawMarkers: map(trade => {
                    //   if (trade) {
                    //     const increaseList = trade.increaseList
                    //     const increaseMarkers = increaseList
                    //       .slice(1)
                    //       .map((ip): SeriesMarker<Time> => {
                    //         return {
                    //           color: pallete.foreground,
                    //           position: "aboveBar",
                    //           shape: "arrowUp",
                    //           time: unixTimeTzOffset(ip.timestamp),
                    //           text: formatReadableUSD(ip.collateralDelta)
                    //         }
                    //       })

                    //     const decreaseList = isTradeSettled(trade) ? trade.decreaseList.slice(0, -1) : trade.decreaseList

                    //     const decreaseMarkers = decreaseList
                    //       .map((ip): SeriesMarker<Time> => {
                    //         return {
                    //           color: pallete.foreground,
                    //           position: 'belowBar',
                    //           shape: "arrowDown",
                    //           time: unixTimeTzOffset(ip.timestamp),
                    //           text: formatReadableUSD(ip.collateralDelta)
                    //         }
                    //       })

                    //     return [...decreaseMarkers, ...increaseMarkers]
                    //   }

                    //   return []
                    // }, config.trade)
                  }
                ],
                containerOp: style({
                  minHeight: '150px',
                  flex: 1,
                  inset: 0,
                  position: 'absolute',
                  borderBottom: `1px solid rgba(191, 187, 207, 0.15)`
                }),
                chartConfig: {
                  rightPriceScale: {
                    visible: true,
                    entireTextOnly: true,
                    borderVisible: false,
                    scaleMargins: {
                      top: 0.1,
                      bottom: 0.1
                    }

                    // autoScale: true,
                    // mode: PriceScaleMode.Logarithmic
                    // visible: false
                  },
                  timeScale: {
                    timeVisible: true,
                    // timeVisible: timeframeState <= intervalTimeMap.DAY7,
                    // secondsVisible: timeframeState <= intervalTimeMap.MIN60,
                    borderVisible: true,
                    rightOffset: 15,
                    shiftVisibleRangeOnNewBar: true,
                    borderColor: pallete.middleground,
                  },
                  crosshair: {
                    mode: CrosshairMode.Normal,
                    horzLine: {
                      labelBackgroundColor: pallete.background,
                      color: pallete.foreground,
                      width: 1,
                      style: LineStyle.Dotted
                    },
                    vertLine: {
                      labelBackgroundColor: pallete.background,
                      color: pallete.foreground,
                      width: 1,
                      style: LineStyle.Dotted,
                    }
                  }
                },
              })({
                // crosshairMove: sampleChartCrosshair(),
                // click: sampleClick()
              }),
              switchLatest(map(feed => {
                if (feed) {
                  return empty()
                }

                return $node(style({ position: 'absolute', zIndex: 10, display: 'flex', inset: 0, backgroundColor: colorAlpha(pallete.middleground, .10), placeContent: 'center', alignItems: 'center' }))(
                  $spinner
                )
              }, mergeArray([config.pricefeed, constant(null, requestPricefeed), now(null)]))),
            ),


            $column(style({ minHeight: '200px', padding: '15px' }))(


              switchLatest(map(list => {

                if (!Array.isArray(list)) {
                  return $row(layoutSheet.spacingSmall, style({ alignItems: 'center' }))(
                    $spinner,
                    $text(style({ fontSize: '.75em' }))('Loading open trades')
                  )
                }

                return $Table2<ITradeOpen>({
                  bodyContainerOp: layoutSheet.spacing,
                  scrollConfig: {
                    containerOps: O(layoutSheet.spacingBig)
                  },
                  dataSource: now(list.filter(isTradeOpen)),
                  columns: [
                    {
                      $head: $text('Entry'),
                      columnOp: O(style({ maxWidth: '65px', flexDirection: 'column' }), layoutSheet.spacingTiny),
                      $body: map((pos) => {
                        return $Link({
                          anchorOp: style({ position: 'relative' }),
                          $content: style({ pointerEvents: 'none' }, $Entry(pos)),
                          url: `/${getChainName(chain).toLowerCase()}/${CHAIN_TOKEN_ADDRESS_TO_SYMBOL[pos.indexToken]}/${pos.id}/${pos.timestamp}`,
                          route: config.parentRoute.create({ fragment: '2121212' })
                        })({ click: changeRouteTether() })
                      })
                    },
                    {
                      $head: $text('Risk'),
                      columnOp: O(layoutSheet.spacingTiny, style({ flex: 1.3, alignItems: 'center', placeContent: 'flex-start', minWidth: '80px' })),
                      $body: map(trade => {
                        const positionMarkPrice = pricefeed.getLatestPrice(trade.indexToken)

                        return $row(
                          $RiskLiquidator(trade, positionMarkPrice)({})
                        )
                      })
                    },
                    {
                      $head: $text('PnL $'),
                      columnOp: style({ flex: 2, placeContent: 'flex-end', maxWidth: '160px' }),
                      $body: map((trade) => {
                        const newLocal = pricefeed.getLatestPrice(trade.indexToken)
                        return $livePnl(trade, newLocal)
                      })
                    },
                    {
                      $head: $text('Switch'),
                      columnOp: style({ flex: 2, placeContent: 'center', maxWidth: '80px' }),
                      $body: map((trade) => {

                        const clickSwitchBehavior = switchTradeTether(
                          nodeEvent('click'),
                          constant(trade),
                        )

                        return $row(styleBehavior(map(pos => pos && pos.key === trade.key ? { pointerEvents: 'none', opacity: '0.3' } : {}, vaultPosition)))(
                          clickSwitchBehavior(
                            style({ height: '28px', width: '28px' }, $iconCircular($arrowsFlip, pallete.horizon))
                          )
                        )
                      })
                    },
                  ],
                })({})
              }, mergeArray([config.accountTradeList, requestAccountTradeList])))
            ),
          ),
        ),
      )
    ),

    {
      requestPricefeed,
      requestAccountTradeList,
      requestLatestPriceMap: constant({ chain }, periodic(5000)),
      requestTrade: map(pos => pos ? <IRequestTradeQueryparam>{ id: 'Trade:' + pos.key, chain: USE_CHAIN } : null, vaultPosition),
      changeRoute,
      walletChange
    }
  ]
})
