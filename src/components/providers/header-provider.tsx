import { createContext, useState } from 'react';

type HeaderConfig = {
  show: boolean;
  showBack?: boolean;
  title?: string;
  right?: React.ReactNode;
};

type HeaderContextValue = {
  header: HeaderConfig;
  setHeader: React.Dispatch<React.SetStateAction<HeaderConfig>>;
};

const initialHeaderContextState = {
  show: true,
  showBack: true,
};

const HeaderContext = createContext<HeaderContextValue | null>(null);

function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<HeaderConfig>(initialHeaderContextState);

  const value = { header, setHeader };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

export default HeaderProvider;
