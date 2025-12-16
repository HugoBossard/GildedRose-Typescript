export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const itemNameIsAgedBrie = (item: Item): boolean => {
      return item.name == 'Aged Brie';
    }

    const itemNameIsBackstagePasses = (item: Item): boolean => {
      return item.name == 'Backstage passes to a TAFKAL80ETC concert';
    }

    const itemNameIsNotSulfuras = (item: Item): boolean => {
      return item.name != 'Sulfuras, Hand of Ragnaros';
    }

    const itemQualityBellowFifty = (item: Item): boolean => {
      return item.quality < 50
    }

    const itemQualityUpperZero = (item: Item): boolean => {
      return item.quality > 0;
    }


    for (const item of this.items) {
      if (!itemNameIsAgedBrie(item) && !itemNameIsBackstagePasses(item)) {
        if (itemQualityUpperZero(item) && itemNameIsNotSulfuras(item)) {
          item.quality -= 1;
        }
      }
      
      if (itemQualityBellowFifty(item)) {
        item.quality -= 1;

        if (itemNameIsBackstagePasses(item)) {
          if (item.sellIn < 6) {
            item.quality += 1;
          }

          if (item.sellIn < 11 ) {
            item.quality += 1;
          }
        }
      }

      if (item.sellIn < 0) {
        if (itemNameIsAgedBrie(item) && itemQualityBellowFifty(item)) {
          item.quality += 1;
          continue;
        }

        if (itemNameIsBackstagePasses(item)) {
          item.quality = 0;
          continue;
        }

        if (itemQualityUpperZero(item) && itemNameIsNotSulfuras(item)) {
          item.quality -= 1;
        }
      }
    }

    return this.items;
  }
}