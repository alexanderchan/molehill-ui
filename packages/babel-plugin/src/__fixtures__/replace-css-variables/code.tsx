function App() {
  const someTemplateVar = '1rem'
  return (
    <div
      sx={{
        backgroundColor: '--blue-100',
        color: 'var(--red-500)',
        someFunc() {},
        px: '--space-5',
        m: `--space-5 ${someTemplateVar} --space-5 ${someTemplateVar}`,
        p: 'calc(--space-5 + 5px + var( --space-10 ))',
        '& > svg': {
          color: '--indigo-100',
        },
        pt: '--space-2',
        sm: {
          bg: '--blue-100',
        },
      }}
      style={{ padding: '--space-5' }}
    >
      {' '}
      test{' '}
    </div>
  )
}
