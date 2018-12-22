var ALIASES = {};
ALIASES['alloc'] = {"{}":[{'crate':'alloc','ty':8,'name':'Display','desc':'Format trait for an empty format, `{}`.','p':'alloc::fmt'}],"{:?}":[{'crate':'alloc','ty':8,'name':'Debug','desc':'`?` formatting.','p':'alloc::fmt'}],};
ALIASES['core'] = {"/=":[{'crate':'core','ty':8,'name':'DivAssign','desc':'The division assignment operator `/=`.','p':'core::ops'}],"..=":[{'crate':'core','ty':3,'name':'RangeInclusive','desc':'A range bounded inclusively below and above (`start..=end`).','p':'core::ops'},{'crate':'core','ty':3,'name':'RangeToInclusive','desc':'A range only bounded inclusively above (`..=end`).','p':'core::ops'}],"*":[{'crate':'core','ty':8,'name':'Mul','desc':'The multiplication operator `*`.','p':'core::ops'},{'crate':'core','ty':8,'name':'MulAssign','desc':'The multiplication assignment operator `*=`.','p':'core::ops'},{'crate':'core','ty':8,'name':'Deref','desc':'Used for immutable dereferencing operations, like `*v`.','p':'core::ops'},{'crate':'core','ty':8,'name':'DerefMut','desc':'Used for mutable dereferencing operations, like in `*v =…','p':'core::ops'}],">=":[{'crate':'core','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'core::cmp'},{'crate':'core','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'core::cmp'}],"^=":[{'crate':'core','ty':8,'name':'BitXorAssign','desc':'The bitwise XOR assignment operator `^=`.','p':'core::ops'}],">":[{'crate':'core','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'core::cmp'},{'crate':'core','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'core::cmp'}],"&=":[{'crate':'core','ty':8,'name':'BitAndAssign','desc':'The bitwise AND assignment operator `&=`.','p':'core::ops'}],"<=":[{'crate':'core','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'core::cmp'},{'crate':'core','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'core::cmp'}],"^":[{'crate':'core','ty':8,'name':'BitXor','desc':'The bitwise XOR operator `^`.','p':'core::ops'}],"[]":[{'crate':'core','ty':8,'name':'Index','desc':'Used for indexing operations (`container[index]`) in…','p':'core::ops'},{'crate':'core','ty':8,'name':'IndexMut','desc':'Used for indexing operations (`container[index]`) in…','p':'core::ops'}],"+":[{'crate':'core','ty':8,'name':'Add','desc':'The addition operator `+`.','p':'core::ops'},{'crate':'core','ty':8,'name':'AddAssign','desc':'The addition assignment operator `+=`.','p':'core::ops'}],">>=":[{'crate':'core','ty':8,'name':'ShrAssign','desc':'The right shift assignment operator `>>=`.','p':'core::ops'}],"%":[{'crate':'core','ty':8,'name':'Rem','desc':'The remainder operator `%`.','p':'core::ops'},{'crate':'core','ty':8,'name':'RemAssign','desc':'The remainder assignment operator `%=`.','p':'core::ops'}],"/":[{'crate':'core','ty':8,'name':'Div','desc':'The division operator `/`.','p':'core::ops'},{'crate':'core','ty':8,'name':'DivAssign','desc':'The division assignment operator `/=`.','p':'core::ops'}],"[":[{'crate':'core','ty':8,'name':'Index','desc':'Used for indexing operations (`container[index]`) in…','p':'core::ops'},{'crate':'core','ty':8,'name':'IndexMut','desc':'Used for indexing operations (`container[index]`) in…','p':'core::ops'}],"..":[{'crate':'core','ty':3,'name':'Range','desc':'A (half-open) range bounded inclusively below and…','p':'core::ops'},{'crate':'core','ty':3,'name':'RangeFrom','desc':'A range only bounded inclusively below (`start..`).','p':'core::ops'},{'crate':'core','ty':3,'name':'RangeFull','desc':'An unbounded range (`..`).','p':'core::ops'},{'crate':'core','ty':3,'name':'RangeTo','desc':'A range only bounded exclusively above (`..end`).','p':'core::ops'}],"<<":[{'crate':'core','ty':8,'name':'Shl','desc':'The left shift operator `<<`. Note that because this trait…','p':'core::ops'}],"{}":[{'crate':'core','ty':8,'name':'Display','desc':'Format trait for an empty format, `{}`.','p':'core::fmt'}],"*=":[{'crate':'core','ty':8,'name':'MulAssign','desc':'The multiplication assignment operator `*=`.','p':'core::ops'}],"&":[{'crate':'core','ty':8,'name':'BitAnd','desc':'The bitwise AND operator `&`.','p':'core::ops'}],"<":[{'crate':'core','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'core::cmp'},{'crate':'core','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'core::cmp'}],"|=":[{'crate':'core','ty':8,'name':'BitOrAssign','desc':'The bitwise OR assignment operator `|=`.','p':'core::ops'}],"|":[{'crate':'core','ty':8,'name':'BitOr','desc':'The bitwise OR operator `|`.','p':'core::ops'}],"&*":[{'crate':'core','ty':8,'name':'Deref','desc':'Used for immutable dereferencing operations, like `*v`.','p':'core::ops'}],">>":[{'crate':'core','ty':8,'name':'Shr','desc':'The right shift operator `>>`. Note that because this…','p':'core::ops'}],"-=":[{'crate':'core','ty':8,'name':'SubAssign','desc':'The subtraction assignment operator `-=`.','p':'core::ops'}],"?":[{'crate':'core','ty':8,'name':'Try','desc':'A trait for customizing the behavior of the `?` operator.','p':'core::ops'},{'crate':'core','ty':14,'name':'try','desc':'Helper macro for reducing boilerplate code for matching…','p':'core'}],"==":[{'crate':'core','ty':8,'name':'PartialEq','desc':'Trait for equality comparisons which are partial…','p':'core::cmp'},{'crate':'core','ty':8,'name':'Eq','desc':'Trait for equality comparisons which are equivalence…','p':'core::cmp'}],"!=":[{'crate':'core','ty':8,'name':'PartialEq','desc':'Trait for equality comparisons which are partial…','p':'core::cmp'},{'crate':'core','ty':8,'name':'Eq','desc':'Trait for equality comparisons which are equivalence…','p':'core::cmp'}],"-":[{'crate':'core','ty':8,'name':'Sub','desc':'The subtraction operator `-`.','p':'core::ops'},{'crate':'core','ty':8,'name':'Neg','desc':'The unary negation operator `-`.','p':'core::ops'},{'crate':'core','ty':8,'name':'SubAssign','desc':'The subtraction assignment operator `-=`.','p':'core::ops'}],"+=":[{'crate':'core','ty':8,'name':'AddAssign','desc':'The addition assignment operator `+=`.','p':'core::ops'}],"%=":[{'crate':'core','ty':8,'name':'RemAssign','desc':'The remainder assignment operator `%=`.','p':'core::ops'}],"<<=":[{'crate':'core','ty':8,'name':'ShlAssign','desc':'The left shift assignment operator `<<=`.','p':'core::ops'}],"{:?}":[{'crate':'core','ty':8,'name':'Debug','desc':'`?` formatting.','p':'core::fmt'}],"]":[{'crate':'core','ty':8,'name':'Index','desc':'Used for indexing operations (`container[index]`) in…','p':'core::ops'},{'crate':'core','ty':8,'name':'IndexMut','desc':'Used for indexing operations (`container[index]`) in…','p':'core::ops'}],};
ALIASES['std'] = {"<<=":[{'crate':'std','ty':8,'name':'ShlAssign','desc':'The left shift assignment operator `<<=`.','p':'std::ops'}],"]":[{'crate':'std','ty':8,'name':'Index','desc':'Used for indexing operations (`container[index]`) in…','p':'std::ops'},{'crate':'std','ty':8,'name':'IndexMut','desc':'Used for indexing operations (`container[index]`) in…','p':'std::ops'},{'crate':'std','ty':15,'name':'slice','desc':'A dynamically-sized view into a contiguous sequence, `[T]`.','p':'std'}],"/=":[{'crate':'std','ty':8,'name':'DivAssign','desc':'The division assignment operator `/=`.','p':'std::ops'}],"true":[{'crate':'std','ty':15,'name':'bool','desc':'The boolean type.','p':'std'}],"..=":[{'crate':'std','ty':3,'name':'RangeToInclusive','desc':'A range only bounded inclusively above (`..=end`).','p':'std::ops'},{'crate':'std','ty':3,'name':'RangeInclusive','desc':'A range bounded inclusively below and above (`start..=end`).','p':'std::ops'}],"*":[{'crate':'std','ty':8,'name':'DerefMut','desc':'Used for mutable dereferencing operations, like in `*v =…','p':'std::ops'},{'crate':'std','ty':8,'name':'Deref','desc':'Used for immutable dereferencing operations, like `*v`.','p':'std::ops'},{'crate':'std','ty':8,'name':'Mul','desc':'The multiplication operator `*`.','p':'std::ops'},{'crate':'std','ty':8,'name':'MulAssign','desc':'The multiplication assignment operator `*=`.','p':'std::ops'}],">=":[{'crate':'std','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'std::cmp'},{'crate':'std','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'std::cmp'}],"^=":[{'crate':'std','ty':8,'name':'BitXorAssign','desc':'The bitwise XOR assignment operator `^=`.','p':'std::ops'}],">":[{'crate':'std','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'std::cmp'},{'crate':'std','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'std::cmp'}],"(":[{'crate':'std','ty':15,'name':'tuple','desc':'A finite heterogeneous sequence, `(T, U, ..)`.','p':'std'}],"&=":[{'crate':'std','ty':8,'name':'BitAndAssign','desc':'The bitwise AND assignment operator `&=`.','p':'std::ops'}],"<=":[{'crate':'std','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'std::cmp'},{'crate':'std','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'std::cmp'}],"^":[{'crate':'std','ty':8,'name':'BitXor','desc':'The bitwise XOR operator `^`.','p':'std::ops'}],"[]":[{'crate':'std','ty':8,'name':'Index','desc':'Used for indexing operations (`container[index]`) in…','p':'std::ops'},{'crate':'std','ty':8,'name':'IndexMut','desc':'Used for indexing operations (`container[index]`) in…','p':'std::ops'},{'crate':'std','ty':15,'name':'slice','desc':'A dynamically-sized view into a contiguous sequence, `[T]`.','p':'std'}],"+":[{'crate':'std','ty':8,'name':'AddAssign','desc':'The addition assignment operator `+=`.','p':'std::ops'},{'crate':'std','ty':8,'name':'Add','desc':'The addition operator `+`.','p':'std::ops'}],">>=":[{'crate':'std','ty':8,'name':'ShrAssign','desc':'The right shift assignment operator `>>=`.','p':'std::ops'}],"%":[{'crate':'std','ty':8,'name':'RemAssign','desc':'The remainder assignment operator `%=`.','p':'std::ops'},{'crate':'std','ty':8,'name':'Rem','desc':'The remainder operator `%`.','p':'std::ops'}],"/":[{'crate':'std','ty':8,'name':'DivAssign','desc':'The division assignment operator `/=`.','p':'std::ops'},{'crate':'std','ty':8,'name':'Div','desc':'The division operator `/`.','p':'std::ops'}],"[":[{'crate':'std','ty':8,'name':'Index','desc':'Used for indexing operations (`container[index]`) in…','p':'std::ops'},{'crate':'std','ty':8,'name':'IndexMut','desc':'Used for indexing operations (`container[index]`) in…','p':'std::ops'},{'crate':'std','ty':15,'name':'slice','desc':'A dynamically-sized view into a contiguous sequence, `[T]`.','p':'std'}],"..":[{'crate':'std','ty':3,'name':'RangeFrom','desc':'A range only bounded inclusively below (`start..`).','p':'std::ops'},{'crate':'std','ty':3,'name':'RangeFull','desc':'An unbounded range (`..`).','p':'std::ops'},{'crate':'std','ty':3,'name':'Range','desc':'A (half-open) range bounded inclusively below and…','p':'std::ops'},{'crate':'std','ty':3,'name':'RangeTo','desc':'A range only bounded exclusively above (`..end`).','p':'std::ops'}],"<<":[{'crate':'std','ty':8,'name':'Shl','desc':'The left shift operator `<<`. Note that because this trait…','p':'std::ops'}],"()":[{'crate':'std','ty':15,'name':'tuple','desc':'A finite heterogeneous sequence, `(T, U, ..)`.','p':'std'}],"{}":[{'crate':'std','ty':8,'name':'Display','desc':'Format trait for an empty format, `{}`.','p':'std::fmt'}],"<":[{'crate':'std','ty':8,'name':'Ord','desc':'Trait for types that form a total order.','p':'std::cmp'},{'crate':'std','ty':8,'name':'PartialOrd','desc':'Trait for values that can be compared for a sort-order.','p':'std::cmp'}],"&":[{'crate':'std','ty':8,'name':'BitAnd','desc':'The bitwise AND operator `&`.','p':'std::ops'},{'crate':'std','ty':15,'name':'reference','desc':'References, both shared and mutable.','p':'std'}],"*=":[{'crate':'std','ty':8,'name':'MulAssign','desc':'The multiplication assignment operator `*=`.','p':'std::ops'}],"|=":[{'crate':'std','ty':8,'name':'BitOrAssign','desc':'The bitwise OR assignment operator `|=`.','p':'std::ops'}],"|":[{'crate':'std','ty':8,'name':'BitOr','desc':'The bitwise OR operator `|`.','p':'std::ops'}],"false":[{'crate':'std','ty':15,'name':'bool','desc':'The boolean type.','p':'std'}],"&*":[{'crate':'std','ty':8,'name':'Deref','desc':'Used for immutable dereferencing operations, like `*v`.','p':'std::ops'}],">>":[{'crate':'std','ty':8,'name':'Shr','desc':'The right shift operator `>>`. Note that because this…','p':'std::ops'}],"?":[{'crate':'std','ty':14,'name':'try','desc':'Helper macro for reducing boilerplate code for matching…','p':'std'},{'crate':'std','ty':8,'name':'Try','desc':'A trait for customizing the behavior of the `?` operator.','p':'std::ops'}],"-=":[{'crate':'std','ty':8,'name':'SubAssign','desc':'The subtraction assignment operator `-=`.','p':'std::ops'}],")":[{'crate':'std','ty':15,'name':'tuple','desc':'A finite heterogeneous sequence, `(T, U, ..)`.','p':'std'}],"==":[{'crate':'std','ty':8,'name':'PartialEq','desc':'Trait for equality comparisons which are partial…','p':'std::cmp'},{'crate':'std','ty':8,'name':'Eq','desc':'Trait for equality comparisons which are equivalence…','p':'std::cmp'}],"!=":[{'crate':'std','ty':8,'name':'PartialEq','desc':'Trait for equality comparisons which are partial…','p':'std::cmp'},{'crate':'std','ty':8,'name':'Eq','desc':'Trait for equality comparisons which are equivalence…','p':'std::cmp'}],"-":[{'crate':'std','ty':8,'name':'Neg','desc':'The unary negation operator `-`.','p':'std::ops'},{'crate':'std','ty':8,'name':'SubAssign','desc':'The subtraction assignment operator `-=`.','p':'std::ops'},{'crate':'std','ty':8,'name':'Sub','desc':'The subtraction operator `-`.','p':'std::ops'}],"+=":[{'crate':'std','ty':8,'name':'AddAssign','desc':'The addition assignment operator `+=`.','p':'std::ops'}],"%=":[{'crate':'std','ty':8,'name':'RemAssign','desc':'The remainder assignment operator `%=`.','p':'std::ops'}],"{:?}":[{'crate':'std','ty':8,'name':'Debug','desc':'`?` formatting.','p':'std::fmt'}],"!":[{'crate':'std','ty':15,'name':'never','desc':'The `!` type, also called "never".','p':'std'}],};
