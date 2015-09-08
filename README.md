## React Meta Components Core
The core of rmc will be the rendering API. This package defines two
core primitives which are built upon by higher level projects. First, it
defines a data specification (if the project matures and is successful, this
  could be handled as a separate, formal spec), and it defines a rendering
library for creating web pages from the data objects described in the spec.

This may eventually be broken into two smaller pieces, `rmc-data` and
`rmc-render` (or `rmc-react`)
