/* eslint-env node */
import testCases from './test/testCases';
import fs from 'fs';
import path from 'path';
import dedent from 'dedent';

fs.writeFileSync(path.resolve(__dirname, 'examples.md'),
  testCases.map(({name, input, output}) => dedent`
    # ${name}
    
    \`\`\`javascript
    ${input}
    \`\`\`

    becomes

    \`\`\`javascript
    ${output}
    \`\`\`
  `).join('\n'.repeat(2)));
