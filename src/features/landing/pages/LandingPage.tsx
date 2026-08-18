import { landingContent } from '@/content/landingContent';
import { usePageEffects } from '@/hooks/usePageEffects';
import { SectionRail } from '@/shared/organisms/SectionRail';
import { SiteFooter } from '@/shared/organisms/SiteFooter';
import { SiteNav } from '@/shared/organisms/SiteNav';
import { ChallengeSection } from '../sections/ChallengeSection';
import { ContactSection } from '../sections/ContactSection';
import { DiaSection } from '../sections/DiaSection';
import { DifferenceSection } from '../sections/DifferenceSection';
import { HeroSection } from '../sections/HeroSection';
import { MethodSection } from '../sections/MethodSection';
import { ShowcaseSection } from '../sections/ShowcaseSection';
import { SolutionsSection } from '../sections/SolutionsSection';

const railItems = [
  { label: 'Inicio', href: '#hero' },
  { label: 'El desafío', href: '#desafio' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Del dato a la acción', href: '#flujo' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Cómo trabajamos', href: '#metodo' },
  { label: 'Por qué INDATTA', href: '#diferencial' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const LandingPage = () => {
  const { activeHref, navIsLight } = usePageEffects();

  return (
    <>
      <a className="skip-link" href="#main">Saltar al contenido principal</a>
      <SiteNav items={landingContent.nav} activeHref={activeHref} light={navIsLight} logo={landingContent.brand.lockupInverse} />
      <main id="main">
        <HeroSection content={landingContent} />
        <ChallengeSection content={landingContent} />
        <SolutionsSection content={landingContent} />
        <DiaSection content={landingContent} />
        <ShowcaseSection content={landingContent} />
        <MethodSection content={landingContent} />
        <DifferenceSection content={landingContent} />
        <ContactSection content={landingContent} />
      </main>
      <SiteFooter content={landingContent} />
      <SectionRail items={railItems} activeHref={activeHref} />
    </>
  );
};
