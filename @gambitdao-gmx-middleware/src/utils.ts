import { combineObject, O, Op, replayLatest } from "@aelea/core"
import { AnimationFrames } from "@aelea/dom"
import { Disposable, Scheduler, Sink, Stream } from "@most/types"
import { at, awaitPromises, constant, continueWith, filter, merge, multicast, now, recoverWith, combineArray as combineArrayMost } from "@most/core"
import { CHAIN, EXPLORER_URL, intervalTimeMap, NETWORK_METADATA, USD_DECIMALS } from "./constant"
import { IPageParapApi, IPagePositionParamApi, ISortParamApi } from "./types"
import { keccak256 } from "@ethersproject/solidity"

export const ETH_ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/i
export const TX_HASH_REGEX = /^0x([A-Fa-f0-9]{64})$/i
export const VALID_FRACTIONAL_NUMBER_REGEXP = /^-?(0|[1-9]\d*)(\.\d+)?$/

const EMPTY_MESSAGE = '-'



// Constant to pull zeros from for multipliers
let zeros = "0"
while (zeros.length < 256) { zeros += zeros }

export function isAddress(address: string) {
  return ETH_ADDRESS_REGEXP.test(address)
}

export function shortenAddress(address: string, padRight = 4, padLeft = 6) {
  return address.slice(0, padLeft) + "..." + address.slice(address.length - padRight, address.length)
}

export function shortPostAdress(address: string) {
  return address.slice(address.length - 4, address.length)
}

export function readableNumber(ammount: number | bigint) {
  const parts = ammount.toString().split('.')
  const [whole = '', decimal = ''] = parts

  if (whole === '' && decimal === '') {
    return EMPTY_MESSAGE
  }

  if (whole.replace(/^-/, '') === '0' || whole.length < 3) {
    const shortDecimal = trimTrailingNumber(decimal)
    return whole + (shortDecimal ? '.' + shortDecimal : '')
  }

  return Number(whole).toLocaleString()
}

export const trimTrailingNumber = (n: string) => {
  const match = n.match(/(^0+\d{2}|^\d{2})/)
  // const match = n.match(new RegExp(`(^0+d{2}|^d{2})`))
  return match ? match[0] : ''
}

const defaultNumberFormatOption: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
}

export function formatReadableUSD(ammount: bigint, options?: Intl.NumberFormatOptions) {
  if (ammount === 0n) {
    return '$0'
  }

  const amountUsd = formatFixed(ammount, USD_DECIMALS)
  const opts = options
    ? { ...defaultNumberFormatOption, ...options }
    : amountUsd > 100 ? defaultNumberFormatOption : { ...defaultNumberFormatOption, maximumFractionDigits: 1 }

  return new Intl.NumberFormat("en-US", opts).format(amountUsd)
}

export function shortenTxAddress(address: string) {
  return shortenAddress(address, 8, 6)
}

export function getDenominator(decimals: number) {
  return 10n ** BigInt(decimals)
}

export function expandDecimals(n: bigint, decimals: number) {
  return n * getDenominator(decimals)
}

function getMultiplier(decimals: number): string {
  if (decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
    return ("1" + zeros.substring(0, decimals))
  }

  throw new Error("invalid decimal size")
}

export function formatFixed(value: bigint, decimals = 18): number {
  const multiplier = getMultiplier(decimals)
  const multiplierBn = BigInt(multiplier)
  let parsedValue = ''

  const negative = value < 0n
  if (negative) {
    value *= -1n
  }

  let fraction = (value % multiplierBn).toString()

  while (fraction.length < multiplier.length - 1) {
    fraction = "0" + fraction
  }

  const matchFractions = fraction.match(/^([0-9]*[1-9]|0)(0*)/)!
  fraction = matchFractions[1]

  const whole = (value / multiplierBn).toString()

  parsedValue = whole + "." + fraction

  if (negative) {
    parsedValue = "-" + parsedValue
  }

  return Number(parsedValue)
}

export function parseFixed(input: string | number, decimals = 18) {
  let value = typeof input === 'number' ? String(input) : input

  const multiplier = getMultiplier(decimals)
  const multiplierLength = multiplier.length

  if (!VALID_FRACTIONAL_NUMBER_REGEXP.test(value)) {
    throw new Error('invalid fractional value')
  }

  if (multiplier.length - 1 === 0) {
    return BigInt(value)
  }

  const negative = (value.substring(0, 1) === "-")
  if (negative) {
    value = value.substring(1)
  }
  const comps = value.split(".")

  let whole = comps[0]
  let fraction = comps[1]

  if (!whole) { whole = "0" }
  if (!fraction) { fraction = "0" }

  // Prevent underflow
  if (fraction.length > multiplierLength - 1) {
    throw new Error('fractional component exceeds decimals')
  }

  // Fully pad the string with zeros to get to wei
  while (fraction.length < multiplierLength - 1) { fraction += "0" }

  const wholeValue = BigInt(whole)
  const fractionValue = BigInt(fraction)

  let wei = (wholeValue * BigInt(multiplier)) + fractionValue

  if (negative) {
    wei = wei - -1n
  }

  return wei
}

export const limitDecimals = (amount: string, maxDecimals: number) => {
  let amountStr = amount.toString()

  if (maxDecimals === 0) {
    return amountStr.split(".")[0]
  }
  const dotIndex = amountStr.indexOf(".")
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1
    if (decimals > maxDecimals) {
      amountStr = amountStr.substr(0, amountStr.length - (decimals - maxDecimals))
    }
  }
  return amountStr
}

export const padDecimals = (amount: string, minDecimals: number) => {
  let amountStr = amount.toString()
  const dotIndex = amountStr.indexOf(".")
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1
    if (decimals < minDecimals) {
      amountStr = amountStr.padEnd(amountStr.length + (minDecimals - decimals), "0")
    }
  } else {
    amountStr = amountStr + ".0000"
  }
  return amountStr
}


/* converts bigInt(positive) to hex */
export function bnToHex(n: bigint) {
  if (n < 0n) {
    throw new Error('expected positive integer')
  }

  let hex = n.toString(16)
  if (hex.length % 2) {
    hex = 'x' + hex
  }
  return hex
}

export function bytesToHex(uint8a: Uint8Array): string {
  let hex = ''
  for (let i = 0; i < uint8a.length; i++) {
    hex += uint8a[i].toString(16).padStart(2, '0')
  }
  return hex
}

export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== 'string' || hex.length % 2) throw new Error('Expected valid hex')
  const array = new Uint8Array(hex.length / 2)
  for (let i = 0; i < array.length; i++) {
    const j = i * 2
    array[i] = Number.parseInt(hex.slice(j, j + 2), 16)
  }
  return array
}

export function hex2asc(pStr: string) {
  let tempstr = ''
  for (let b = 0; b < pStr.length; b = b + 2) {
    tempstr = tempstr + String.fromCharCode(parseInt(pStr.substr(b, 2), 16))
  }
  return tempstr
}

export declare type Nominal<T, Name extends string> = T & {
  [Symbol.species]: Name
}

export type UTCTimestamp = Nominal<number, "UTCTimestamp">

export const tzOffset = new Date().getTimezoneOffset() * 60000

export function timeTzOffset(ms: number): UTCTimestamp {
  return Math.floor((ms - tzOffset)) as UTCTimestamp
}

export function unixTimeTzOffset(ms: number): UTCTimestamp {
  return ms as UTCTimestamp
}


export type TimelineTime = {
  time: number
}

export interface IFillGap<T, R, RTime extends R & TimelineTime = R & TimelineTime> {
  interval: intervalTimeMap
  getTime: (t: T) => number
  seed: R & TimelineTime
  source: T[]

  fillMap: (prev: RTime, next: T) => R
  fillGapMap?: (prev: RTime, next: T) => R
  squashMap?: (prev: RTime, next: T) => R
}


export function intervalListFillOrderMap<T, R, RTime extends R & TimelineTime = R & TimelineTime>({
  source, getTime, seed, interval,
  fillMap, squashMap = fillMap, fillGapMap = (prev, _next) => prev
}: IFillGap<T, R, RTime>) {



  const sortedSource = [...source].sort((a, b) => getTime(a) - getTime(b))

  const initialSourceTime = getTime(sortedSource[0])
  if (seed.time > initialSourceTime) {
    throw new Error(`inital source time: ${initialSourceTime} must be greater then seed time: ${seed.time}}`)
  }

  const seedSlot = Math.floor(seed.time / interval)
  const normalizedSeed = { ...seed, time: seedSlot * interval } as RTime

  const timeslotMap: { [k: number]: RTime } = {
    [seedSlot]: normalizedSeed
  }

  return sortedSource.reduce((timeline: RTime[], next: T) => {
    const lastIdx = timeline.length - 1
    const slot = Math.floor(getTime(next) / interval)
    const squashPrev = timeslotMap[slot]

    if (squashPrev) {
      const newSqush = { ...squashMap(squashPrev, next), time: squashPrev.time } as RTime
      timeslotMap[slot] = newSqush
      timeline.splice(lastIdx, 1, newSqush)
    } else {
      const prev = timeline[timeline.length - 1]

      const time = slot * interval
      const barSpan = (time - prev.time) / interval
      const barSpanCeil = barSpan - 1

      for (let index = 1; index <= barSpanCeil; index++) {
        const fillNext = fillGapMap(timeline[timeline.length - 1], next)
        const gapTime = interval * index
        const newTime = prev.time + gapTime
        const newTick = { ...fillNext, time: newTime } as RTime
        const newSlot = Math.floor(newTime / interval)

        timeslotMap[newSlot] ??= newTick
        timeline.push(newTick)
      }

      const lastTick = fillMap(prev, next)
      const item = { ...lastTick, time: time } as RTime

      timeslotMap[slot] = item
      timeline.push(item)
    }

    return timeline
  },
    [normalizedSeed])
}



export async function pagingQuery<T, ReqParams extends IPagePositionParamApi & (ISortParamApi<keyof T> | {})>(
  queryParams: ReqParams,
  query: Promise<T[]>,
  customComperator?: (a: T, b: T) => number
): Promise<IPageParapApi<T>> {
  const res = await query
  let list = res
  if ('sortBy' in queryParams) {
    const sortBy = queryParams.sortBy

    const comperator = typeof customComperator === 'function' ? customComperator : (a: T, b: T) =>
      queryParams.sortDirection === 'asc'
        ? Number(b[sortBy]) - Number(a[sortBy])
        : Number(a[sortBy]) - Number(b[sortBy])


    list = res.sort(comperator)
  }

  const { pageSize, offset } = queryParams
  const page = list.slice(queryParams.offset, offset + pageSize)
  return { offset, page, pageSize }
}


export const unixTimestampNow = () => Math.floor(Date.now() / 1000)

export const getChainName = (chain: CHAIN) => NETWORK_METADATA[chain].chainName

export const getTxExplorerUrl = (chain: CHAIN, hash: string) => {
  return EXPLORER_URL[chain] + 'tx/' + hash
}

export function getAccountExplorerUrl(chain: CHAIN, account: string) {
  return EXPLORER_URL[chain] + "address/" + account
}


type StreamInput<T> = {
  [P in keyof T]: Stream<T[P]>
}

class WithAnimationFrame<T> {
  constructor(private afp: AnimationFrames, private source: Stream<T>) { }

  run(sink: Sink<T>, scheduler: Scheduler): Disposable {

    const frameSink = this.source.run(new WithAnimationFrameSink(this.afp, sink), scheduler)

    return frameSink
  }
}



class WithAnimationFrameSink<T> implements Sink<T> {
  latestPendingFrame = -1

  constructor(private afp: AnimationFrames, private sink: Sink<T>) { }

  event(time: number, value: T): void {
    
    if (this.latestPendingFrame > -1) {
      this.afp.cancelAnimationFrame(this.latestPendingFrame)
    }

    this.latestPendingFrame = this.afp.requestAnimationFrame(() => {
      // console.log(this.latestPendingFrame)
      this.latestPendingFrame = -1
      eventThenEnd(time, this.sink, value)
    })
  }

  end(): void {
    if (this.latestPendingFrame > -1) {
      this.afp.cancelAnimationFrame(this.latestPendingFrame)
    }
  }

  error(time: number, err: Error): void {
    this.end()
    this.sink.error(time, err)
  }
}

const eventThenEnd = <T>(requestTime: number, sink: Sink<T>, value: T) => {
  sink.event(requestTime, value)
}

export const drawWithinFrame = <T>(source: Stream<T>, afp: AnimationFrames = window): Stream<T> =>
  new WithAnimationFrame(afp, source)


export function replayState<A>(state: StreamInput<A>): Stream<A> {
  return replayLatest(multicast(combineObject(state)))
}

export function getPositionKey (account: string, collateralToken: string, indexToken: string, isLong: boolean) {
  return keccak256(
    ["address", "address", "address", "bool"],
    [account, collateralToken, indexToken, isLong]
  )
}


// export function replayState<A, K extends keyof A = keyof A>(state: StreamInput<A>, initialState: A): Stream<A> {
//   const entries = Object.entries(state) as [keyof A, Stream<A[K]>][]
//   const streams = entries.map(([key, stream]) => replayLatest(stream, initialState[key]))

//   const combinedWithInitial = combineArrayMost((...arrgs: A[K][]) => {
//     return arrgs.reduce((seed, val, idx) => {
//       const key = entries[idx][0]
//       seed[key] = val

//       return seed
//     }, {} as A)
//   }, streams)

//   return combinedWithInitial
// }



export interface IPeriodRun<T> {
  actionOp: Op<number, Promise<T>>

  interval?: number
  startImmediate?: boolean
  recoverError?: boolean
}

export const filterNull = <T>(prov: Stream<T | null>) => filter((provider): provider is T => provider !== null, prov)


export const periodicRun = <T>({ actionOp, interval = 1000, startImmediate = true, recoverError = true }: IPeriodRun<T>): Stream<T> => {
  const tickDelay = at(interval, null)
  const tick = startImmediate ? merge(now(null), tickDelay) : tickDelay

  return O(
    constant(performance.now()),
    actionOp,
    awaitPromises,
    recoverError
      ? recoverWith(err => {
        console.error(err)

        return periodicRun({ interval: interval * 2, actionOp, recoverError, startImmediate: false })
      })
      : O(),
    continueWith(() => {
      return periodicRun({ interval, actionOp, recoverError, startImmediate: false, })
    }),
  )(tick)
}

export const switchFailedSources = <T>(sourceList: Stream<T>[], activeSource = 0): Stream<T> => {
  const source = sourceList[activeSource]
  return recoverWith(() => {
    const nextActive = activeSource + 1
    if (!sourceList[nextActive]) {
      throw new Error('No sources left to recover with')
    }

    return switchFailedSources(sourceList, nextActive)
  }, source)
}


export const timespanPassedSinceInvoke = (timespan: number) => {
  let lastTimePasses = 0

  return () => {
    const now = unixTimestampNow()
    if (now - lastTimePasses > timespan) {
      lastTimePasses = now
      return true
    }

    return false
  }
}

export const cacheMap = (cacheMap: any) => async <T>(key: string, lifespan: number, cacheFn: () => Promise<T>): Promise<T> => {
  const cacheEntry = cacheMap[key]

  if (cacheEntry && !cacheMap[key].lifespanFn()) {
    return cacheEntry.item
  } else {
    const lifespanFn = cacheMap[key]?.lifespanFn ?? timespanPassedSinceInvoke(lifespan)
    lifespanFn()
    cacheMap[key] = { item: cacheFn(), lifespanFn }
    return cacheMap[key].item
  }
}



export function groupByMapMany<A, B extends string | symbol | number>(list: A[], getKey: (v: A) => B) {
  const map: { [P in B]: A[] } = {} as any

  list.forEach(item => {
    const key = getKey(item)

    map[key] ??= []
    map[key].push(item)
  })

  return map
}

export function getMappedKeyByValue<T>(map: { [P in keyof T]: T[P] }, match: T[keyof T]): keyof T {
  const entires: any[] = Object.values(map)
  const val = entires.find(symb => symb === match)

  if (!val) {
    throw new Error(`No token ${match} matched`)
  }

  return val
}

export function groupByMap<A, B extends string | symbol | number>(list: A[], getKey: (v: A) => B) {
  const map: { [P in B]: A } = {} as any

  list.forEach((item) => {
    const key = getKey(item)

    if (map[key]) {
      console.warn(new Error(`${groupByMap.name}() is overwriting property: ${String(key)}`))
    }

    map[key] = item
  })

  return map
}
