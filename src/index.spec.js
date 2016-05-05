const expect = require('chai').expect;

const bem = require('../lib/index.js').bem;
const cssm = require('../lib/index.js').cssm;

const styles = {
  root: 'block__root',
  'root_mod-name_mod-value': 'block__root_mod-name_mod-value',
  'root_another-mod_another-value': 'block__root_another-mod_another-value',
  element: 'block__element',
  element_mod_false: 'block__element_mod_false',
  'element-no-base_mod-name_mod-value': 'block__element-no-base_mod-name_mod-value',
  'element_mod-name_mod-value': 'block__element_mod-name_mod-value',
  'element_another-mod_another-value': 'block__element_another-mod_another-value',
};

function common(cn) {
  it('cn is function', () => {
    expect(typeof cn).to.equal('function');
  });
  it('cn returns block__element on call with element', () => {
    expect(cn('element')).to.equal('block__element');
  });
  it('cn returns block__element block__element_modName_modValue on call with element and mods',
    () => {
      expect(cn('element', { modName: 'mod-value', anotherMod: 'another-value' })).to.equal(
      'block__element block__element_mod-name_mod-value block__element_another-mod_another-value');
    });
  it('cn skips undefined mods but not false', () => {
    expect(cn('element', { mod: undefined })).to.equal('block__element');
    expect(cn('element', { mod: null })).to.equal('block__element');
    expect(cn('element', { mod: false })).to.equal('block__element block__element_mod_false');
  });
}

describe('BEM', () => {
  it('is exported', () => {
    expect(typeof bem).to.equal('function');
  });
  it('cn default block is empty string', () => {
    const cn = bem();
    expect(cn()).to.equal('');
  });
  it('cn returns block on call', () => {
    const cn = bem('block');
    expect(cn()).to.equal('block');
  });
  it('cn returns block block_modName_modValue on call without element and with mods', () => {
    const cn = bem('block');
    expect(cn({ modName: 'mod-value', anotherMod: 'another-value' })).to.equal(
      'block block_mod-name_mod-value block_another-mod_another-value');
  });
  common(bem('block'));
});

describe('CSS Modules', () => {
  const cn = cssm(styles);
  it('is exported', () => {
    expect(typeof cssm).to.equal('function');
  });
  it('cn default element is root', () => {
    expect(cn()).to.equal('block__root');
  });
  it('cn returns root root_modName_modValue on call without element and with mods', () => {
    expect(cn({ modName: 'mod-value', anotherMod: 'another-value' })).to.equal(
      'block__root block__root_mod-name_mod-value block__root_another-mod_another-value');
  });
  it('cn skips element if it is undefinded', () => {
    expect(cn('element-no-base', { modName: 'mod-value' })).to.equal(
      'block__element-no-base_mod-name_mod-value');
  });
  common(cssm(styles));
});
