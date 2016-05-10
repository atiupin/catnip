# catnip

Catnip greatly reduces boilerplate class generation code. It's still beta, so use it in production code with caution.

## Init
Catnip first should be initiated with string for BEM generator and styles object for CSS modules generator.

```
import catnip from 'catnip';

const cn = catnip('block'); // Will generate strings
```

```
import catnip from 'catnip';
import styles from './styles.scss';

const cn = catnip(styles); // Will generate strings and takes corresponging items from styles object
```

## Usage
Generator function takes 3 arguments, all optional
```
const className = cn(
  'button',                               // Element (string)
  { style: 'amazing', disabled: false },  // Mods (object)
  ['global-input']                        // Mixes (array)
)
```
Element defines basic class name of element.  
Mods used for dynamic stuff, eg. styles and states.  
Mixes are just global styles which will be added to final class.

## Examples
Catnip uses BEM synax for generating classes
```
cn()                          // block
cn('element')                 // block__element
cn('element', { mod: true })  // block__element block__element_mod_true
cn('element', ['mix'])        // block__element mix
```

CCS modules works in the same way but don't need block
```
import catnip from 'catnip';
import styles from './styles.scss';

const cn = cssm(styles);

cn(element, { mod }) // styles[element] + styles[element_mod_modValue]
```

Catnip automatically converts camel case to snake case in mod names, so it works great with JS object shorthand
```
const someMod = true;
cn('element', { someMod }) // block__element block__element_some-mod_true
```

Mods with null and undefined (but not false) values will be ignored
```
cn('element', { mod: undefined })  // block__element
cn('element', { mod: null })       // block__element
cn('element', { mod: false })      // block__element block__element_mod_false
```

## CSS Modules Notes

If there is no such class in CSS module it will be silently ignored
```
// CSS module have element_mod_true, but not element
cn('element', { mod: true }) // element_mod_true
```

Default element for CSS modules generator is `root`
```
cn({ mod: true }) // root root_mod_true
```