const theme = {
  plain: {
    fontFamily: `Inconsolata, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    color: '#d4d4d4',
    backgroundColor: '#222',
  },
  styles: [
    {
      languages: ['javascript', 'typescript', 'js', 'ts', 'tsx', 'jsx'],
      types: ['class-name'],
      style: {
        color: '#4ec9b0',
      },
    },
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6a9955',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
        color: '#4ec9b0',
      },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'],
      style: {
        color: '#b5cea8',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#d4d4d4',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: '#ce9178',
      },
    },
    {
      types: ['entity', 'operator', 'url'],
      style: {
        color: '#d4d4d4',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: '#c586c0',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#dcdcaa',
      },
    },
    {
      types: ['regex', 'important', 'variable'],
      style: {
        color: '#d16969',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['parameter', 'interpolation'],
      style: {
        color: '#9CDCFE',
      },
    },
  ],
};

export default { light: theme, dark: theme };
