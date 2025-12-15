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
    const itemNameIsAgedBrie = (i: number): boolean => {
      return this.items[i].name == 'Aged Brie';
    }

    const itemNameIsBackstagePasses = (i: number): boolean => {
      return this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert';
    }

    const itemNameIsNotSulfuras = (i: number): boolean => {
      return this.items[i].name != 'Sulfuras, Hand of Ragnaros';
    }

    const itemQualityBellowFifty = (i: number): boolean => {
      return this.items[i].quality < 50
    }

    const itemQualityUpperZero = (i: number): boolean => {
      return this.items[i].quality > 0;
    }


    for (let i = 0; i < this.items.length; i++) {
      if (!itemNameIsAgedBrie(i) && !itemNameIsBackstagePasses(i)) {
        if (itemQualityUpperZero(i) && itemNameIsNotSulfuras(i)) {
          this.items[i].quality -= 1;
        }
      }
      
      if (itemQualityBellowFifty(i)) {
        this.items[i].quality -= 1;

        if (itemNameIsBackstagePasses(i)) {
          if (this.items[i].sellIn < 6) {
            this.items[i].quality += 1;
          }

          if (this.items[i].sellIn < 11 ) {
            this.items[i].quality += 1;
          }
        }
      }

      if (itemNameIsNotSulfuras(i)) {
        this.items[i].sellIn -= 1;
      }

      if (this.items[i].sellIn < 0) {
        if (itemNameIsAgedBrie(i) && itemQualityBellowFifty(i)) {
          this.items[i].quality += 1;
          continue;
        }

        if (itemNameIsBackstagePasses(i)) {
          this.items[i].quality = 0;
          continue;
        }

        if (itemQualityUpperZero(i) && itemNameIsNotSulfuras(i)) {
          this.items[i].quality -= 1;
        }
      }
    }

    return this.items;
  }
}