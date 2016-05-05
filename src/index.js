function snake(str) {
  return str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
}

function getMods(mods) {
  return Object.keys(mods)
    .filter(mod => (mods[mod] !== undefined && mods[mod] !== null))
    .map(mod => `${snake(mod)}_${mods[mod]}`);
}

function bem(block = '') {
  return function cn(...args) {
    switch (args.length) {
      case 1: {
        if (typeof args[0] === 'string') {
          const element = args[0];
          return `${block}__${element}`;
        }
        const mods = args[0];
        return getMods(mods).reduce((sum, mod) => `${sum} ${block}_${mod}`, block);
      }
      case 2: {
        const element = args[0];
        const mods = args[1];
        return getMods(mods).reduce((sum, mod) =>
          `${sum} ${block}__${element}_${mod}`, `${block}__${element}`);
      }
      default:
        return block;
    }
  };
}

function reduceMods(styles, element, mods) {
  const elementClass = styles[element] || '';
  return getMods(mods).reduce((sum, mod) => {
    const className = `${element}_${mod}`;
    if (sum === '') {
      return styles[className];
    }
    return `${sum} ${styles[className]}`;
  }, elementClass);
}

function cssm(styles = {}) {
  return function cn(...args) {
    switch (args.length) {
      case 1: {
        if (typeof args[0] === 'string') {
          const element = args[0];
          return styles[element];
        }
        const mods = args[0];
        const element = 'root';
        return reduceMods(styles, element, mods);
      }
      case 2: {
        const element = args[0];
        const mods = args[1];
        return reduceMods(styles, element, mods);
      }
      default:
        return styles.root || '';
    }
  };
}

module.exports = {
  bem,
  cssm,
};
