import { User } from "./user/user";

// Path Property ist ein leerer String,
//um die die Route standardmäßig zu aktivieren.
// Das default-Schlüsselwort wird verwendet,
// um vom der default-Export Eigenschaft in Lazy Loading zu profitieren.
export default [
  {path: '', component: User}
]