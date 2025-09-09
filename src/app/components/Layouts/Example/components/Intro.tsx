import {clsxm} from '@/lib/clsxm';
import {Button, ButtonProps} from '@/components/commons/Button';
import {Link, LinkProps} from '@/components/commons/Link';


import {BreakpointsList, BreakpointsListProps} from './BreakpointsList';

export type IntroProps = {
  title: string;
  dynamicTitle?: string;
  subTitle?: string;
  button?: {href?: string} & Pick<
    ButtonProps,
    'children' | 'className' | 'handleClick'
  >;
  link?: Pick<LinkProps, 'href' | 'children'>;
  hideOnMobile?: {
    title?: boolean;
    subTitle?: boolean;
    button?: boolean;
    link?: boolean;
    breakpoints?: boolean;
  };
  dynamic?: {status: string; isLoading: boolean};
} & Pick<BreakpointsListProps, 'breakpoints'>;

export const Intro = ({
  title,
  subTitle,
  button,
  link,
  breakpoints,
  hideOnMobile,
  dynamic,
}: IntroProps) => {
  if (dynamic && dynamic.status !== 'success' && dynamic.isLoading) {
    return (
      <div className="flex flex-col gap-1">
      
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row">
      <div>
        <BreakpointsList
          {...{breakpoints, hideOnMobile: hideOnMobile?.breakpoints}}
        />
        <p
          className={clsxm(
            'md:leading-lg text-2xl text-primary md:text-lg',
            hideOnMobile?.title && 'hidden md:block',
          )}>
          {title}
        </p>
        {subTitle ? (
          <p
            className={clsxm(
              'text-gray mt-2 md:mt-4',
              hideOnMobile?.subTitle && 'hidden md:block',
            )}>
            {subTitle}
          </p>
        ) : null}
        {link ? (
          <Link
            href={link.href}
            className={hideOnMobile?.link ? 'hidden md:block' : ''}>
            <p className="text-navy mt-2 md:mt-4">{link.children}</p>
          </Link>
        ) : null}
      </div>
      <div>
        {button ? (
          <>
            {button.href ? (
              <Link
                href={button.href}
                className={hideOnMobile?.button ? 'hidden md:block' : 'block'}>
                <Button fullWidth={true}>{button.children}</Button>
              </Link>
            ) : (
              <Button handleClick={button.handleClick} fullWidth={true}>
                {button.children}
              </Button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
