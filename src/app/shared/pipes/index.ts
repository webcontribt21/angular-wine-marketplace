import { SortByKeys } from './sort-by-keys.pipe';
import { TrimPipe } from './trim.pipe';
import { SortByPipe } from './sortBy.pipe';
import { RangeByPipe } from './range-by.pipe';
import { ShowUnavailableWinesPipe } from './show-unavailable-wines.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { FormatCurrencyPipe } from './format-currency.pipe';
import { FormatAddressPipe } from './format-address.pipe';
import { FormatAddressRecipientPipe } from './format-addressRecipient.pipe';
import { UrlFriendlyPipe } from './url-friendly.pipe';
import { UrlSafePipe } from './url-safe.pipe';
import { ValueDescriptionPipe } from './value-description.pipe';
import { BeautifyApiTextPipe } from './beautify-api-text.pipe';
import { CrossBoldStringPipe } from './cross-bold-string.pipe';
import { EllipsisPipe } from './trunc';

export const pipes = [
  EllipsisPipe,
  SortByKeys,
  TrimPipe,
  SortByPipe,
  RangeByPipe,
  ShowUnavailableWinesPipe,
  FormatDatePipe,
  FormatCurrencyPipe,
  FormatAddressPipe,
  FormatAddressRecipientPipe,
  UrlFriendlyPipe,
  UrlSafePipe,
  ValueDescriptionPipe,
  BeautifyApiTextPipe,
  CrossBoldStringPipe
];
