import * as Colors from'../colors'

export const base = {
  color: Colors.oxasisBlue,
  height: 28,
  width: 28,
};
export const small = {
  ...base,
  height: 18,
  width: 18,
};
export const large = {
  ...base,
  height: 64,
  width: 64,
};
export const accent = {
  ...base,
  color: Colors.oxasisGold,
};
export const accentIconContainer = {
  alignItems: 'center',
  borderColor: Colors.oxasisGold,
  borderRadius: 100,
  borderWidth: 1,
  justifyContent: 'center',
  height: 100,
  width: 100,
};