import {Container} from '@/components/commons/Container';
import {Skeleton} from '@/components/commons/Skeleton/Skeleton';

export const CaseDetailsSkeleton = () => (
  <Container className="py-28">
    <Skeleton
      {...{
        count: 1,
        height: 150,
        inline: true,
        className: 'my-2 md:m-2',
      }}
    />
    <main className="pb-28">
      <div className="flex gap-8 py-5 pb-12">
        <div className="general-info border-cloud w-9/12 border p-7">
          <Skeleton
            {...{
              count: 1,
              height: 230,
              inline: true,
              className: 'my-2 md:m-2',
            }}
          />
        </div>
        <div className="status border-cloud w-3/12 border p-7">
          <Skeleton
            {...{
              count: 1,
              height: 230,
              inline: true,
              className: 'my-2 md:m-2',
            }}
          />
        </div>
      </div>
      <Skeleton
        {...{
          count: 1,
          height: 200,
          inline: true,
          className: 'my-2 md:m-2',
        }}
      />
    </main>
  </Container>
);
