const layout = {
  container: 'flex flex-col justify-center h-[88px]',
}

const text = {
  title:
    'text-[32px] font-semibold leading-[1.2] text-white',
  subtitle:
    'mt-2 text-[13px] font-normal text-white/70',
}

export const WelcomeSection = () => {
  return (
    <section className={layout.container}>
      <h1 className={text.title}>Welcome Back, Talha</h1>
      <p className={text.subtitle}>
        This is your Monthly Overview Report
      </p>
    </section>
  )
}
