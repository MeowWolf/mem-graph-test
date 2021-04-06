export interface IInventory {
  items: IInventoryItem[]
}

export interface IInventoryItem {
  title: string
  uuid: string
  icon: {
    source: string
  }
  quantity: number
  description: string
}

// cool hack for a dumb ts thing
export {}
