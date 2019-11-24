export interface ICurrencyServiceData {
  currencyLocale: string;
  currencyType: string;
  maxFractionDigits: number;
  defaultAmount: number;
}

const currencyServiceData: ICurrencyServiceData = {
  currencyLocale: 'tr-TR',
  currencyType: 'TRY',
  maxFractionDigits: 2,
  defaultAmount: 0,
};

const CurrencyService = {
  getCurrencyLocale() {
    return currencyServiceData.currencyLocale;
  },
  setCurrencyLocale(newVal: string) {
    if (newVal) {
      currencyServiceData.currencyLocale = newVal;
    }
  },
  getCurrencyType() {
    return currencyServiceData.currencyType;
  },
  setCurrencyType(newVal: string) {
    if (newVal) {
      currencyServiceData.currencyType = newVal;
    }
  },
  getCurrencyMaxFractionDigits() {
    return currencyServiceData.maxFractionDigits;
  },
  setCurrencyMaxFractionDigits(newVal: number) {
    if (newVal) {
      currencyServiceData.maxFractionDigits = newVal;
    }
  },
  getCurrencyString(amount: number) {
    if (amount) {
      return this.convertToLocaleString(amount);
    }
    return this.convertToLocaleString(currencyServiceData.defaultAmount);
  },
  convertToLocaleString(number: number) {
    return number.toLocaleString(currencyServiceData.currencyLocale, {
      style: 'currency',
      currency: currencyServiceData.currencyType,
      maximumFractionDigits: currencyServiceData.maxFractionDigits,
    });
  },
};

export default CurrencyService;
