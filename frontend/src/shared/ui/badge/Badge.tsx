import { badge } from './Badge.styles';

interface BadgeProps {
  children: React.ReactNode;
  intent?: 'shortcut' | 'searchShortcut';
}

export const Badge = ({ children, intent }: BadgeProps) => {
  return (
    <span className={badge({ intent })}>
      {children}
    </span>
  );
};
