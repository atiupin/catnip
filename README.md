# catnip

Catnip reduces boilerplate class generation code. It's still really young, so use it in production code with great cautious.

## BEM

Typical code to generate BEM classes
```
<div className={`${block}__${element} ${block}__${element}_${mod}_${modValue}`}/>
```

Catnip code
```
import { bem } from 'catnip';

const cn = bem(block);

<div className={cn(element, { mod })}/> // block__element block__element_mod_modValue
```

Some more examples
```
cn() // block
cn('element') // block__element
cn('element', { someMod: true }) // block__element block__element_some-mod_true
```

## CSS Modules

Code with CSS modules, expecting we have to @include all common element CSS to each mod and each modValue
```
import styles from './styles.scss';
<div className={styles[`${element}_${mod}_${modValue}`]}/>
```

Catnip code. You don't have to @include common CSS to each mod
```
import { cssm } from 'catnip';
import styles from './styles.scss';

const cn = cssm(styles);

<div className={cn(element, { mod })}/> // styles[element] + styles[element__mod_modValue]
```

## Notes
- Mod names will be converted to snake case
- Mods with null and undefined values will be ignored
- Default element for CSS modules is 'root'
- If there is no such class in CSS module it will be silently ignored

## To Do
- Options
- Mixes