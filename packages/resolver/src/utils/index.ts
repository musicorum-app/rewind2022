const normalize = (str: string) => str.toLowerCase().replaceAll(' ', '')

export function aggregate<I>(items: I[], hashFn: (item: I) => string) {
  const aggregator = new Map<string, I[]>()

  for (const item of items) {
    const hash = normalize(hashFn(item))
    if (!aggregator.has(hash)) {
      aggregator.set(hash, [])
    }

    aggregator.get(hash)?.push(item)
  }

  return aggregator
}

export function sortMapWithArray<K, V>(map: Map<K, V[]>) {
  return [...map.values()].sort((a, b) => b.length - a.length)
}
