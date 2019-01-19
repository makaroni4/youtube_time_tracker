import { toHaveClass } from './have_class';
import { toHaveContent } from './have_content';

const customMatchers = {
  toHaveClass,
  toHaveContent
}

global.expect.extend(customMatchers);
