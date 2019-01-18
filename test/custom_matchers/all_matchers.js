import { toHaveClass } from './has_class';

const customMatchers = {
  toHaveClass
}

global.expect.extend(customMatchers);
