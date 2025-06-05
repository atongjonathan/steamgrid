import { createFileRoute } from '@tanstack/react-router'
import HomeBanner from './-components/Banner/Banner'
import SgSlider from './-components/SGSlider';
import { Banner, BannerClose, BannerIcon, BannerTitle, BannerAction } from '@/components/ui/shadcn-io/banner';
import { CircleAlert } from 'lucide-react';

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  document.title = `StreamGrid | Home`

  const limit = 10
  const shuffle = true

  const sliders = [
    {
      title: 'Recently Added',
      params: { ordering: '-created', limit },
    },
    {
      title: 'Latest Release',
      params: { ordering: '-releaseDate', limit },
    },
    {
      title: 'Action',
      params: { genre: 'Action', limit, shuffle },
    },
    {
      title: 'Romance',
      params: { genre: 'Romance', limit, shuffle },
    },
    {
      title: 'Horror',
      params: { genre: 'Horror', limit, shuffle },
    },
    {
      title: 'Animation',
      params: { genre: 'Animation', limit, shuffle },
    },
    {
      title: 'Documentary',
      params: { genre: 'Documentary', limit, shuffle },
    },
    {
      title: 'Top Rated',
      params: { ordering: '-rating_star', limit },
    },
  ]

  return (
    <>
      <Banner className="border border-white rounded mx-1">
        <BannerIcon icon={CircleAlert} />
        <BannerTitle>
          You are currently using the new improved UI experience.
        </BannerTitle>
        <BannerAction
          className="bg-main border border-white hover:bg-main/70 hover:text-white"
          asChild
        >
          <a rel="noopener" href="https://streamgrid.stream" target="_blank">
            Go back
          </a>
        </BannerAction>
        <BannerClose />
      </Banner>

      <HomeBanner />

      <div className="pl-6 pr-2">
        {sliders.map(({ title, params }) => (
          <SgSlider key={title} title={title} params={params} />
        ))}
      </div>
    </>
  )
}
