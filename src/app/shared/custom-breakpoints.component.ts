import { BREAKPOINT } from "@angular/flex-layout";

const CUSTOM_BREAKPOINTS = [{
  alias: "xs",
  suffix: "xs",
  mediaQuery: "screen and (max-width: 470px)",
  overlapping: false
},
{
  alias: "sm",
  suffix: "sm",
  mediaQuery: "screen and (min-width: 471px) and (max-width: 767px)",
  overlapping: false
},
{
  alias: "md",
  suffix: "md",
  mediaQuery: "screen and (min-width: 768px) and (max-width: 991px)",
  overlapping: false
},
{
  alias: "lg",
  suffix: "lg",
  mediaQuery: "screen and (min-width: 992px) and (max-width: 1199px)",
  overlapping: false
},
{
  alias: "xl",
  suffix: "xl",
  mediaQuery: "screen and (min-width: 1200px) and (max-width: 5000px)",
  overlapping: false
},
{
  alias: "lt-sm",
  suffix: "lt-sm",
  mediaQuery: "screen and (max-width: 470px)",
  overlapping: false
},
{
  alias: "lt-md",
  suffix: "lt-md",
  mediaQuery: "screen and (max-width: 767px)",
  overlapping: false
},
{
  alias: "lt-lg",
  suffix: "lt-lg",
  mediaQuery: "screen and (max-width: 991px)",
  overlapping: false
},
{
  alias: "lt-xl",
  suffix: "lt-xl",
  mediaQuery: "screen and (max-width: 1199px)",
  overlapping: false
},
{
  alias: "gt-xs",
  suffix: "gt-xs",
  mediaQuery: "screen and (min-width: 471px)",
  overlapping: false
},
{
  alias: "gt-sm",
  suffix: "gt-sm",
  mediaQuery: "screen and (min-width: 768px)",
  overlapping: false
},
{
  alias: "gt-md",
  suffix: "gt-md",
  mediaQuery: "screen and (min-width: 992px)",
  overlapping: false
},
{
  alias: "gt-lg",
  suffix: "gt-lg",
  mediaQuery: "screen and (min-width: 1200px)",
  overlapping: false
}
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: CUSTOM_BREAKPOINTS,
  multi: true
};
