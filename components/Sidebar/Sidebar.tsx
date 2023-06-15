import { IconMistOff, IconPlus } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';

interface Props<T> {
  isOpen: boolean;
  addItemButtonTitle: string;
  addChatItemButtonTitle: string;
  side: 'left' | 'right';
  items: T[];
  itemComponent: ReactNode;
  chatItems?: any[];
  chatItemComponent?: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  problemDescriptionComponent?: ReactNode;
  searchTerm: string;
  searchChatTerm?: string;
  handleSearchTerm: (searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: () => void;
  handleChatCreateItem: () => void;
  handleCreateFolder: () => void;
  handleChatCreateFolder: () => void;
  handleDrop: (e: any) => void;
  handleChatDrop?: (e: any) => void;
}

const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  addChatItemButtonTitle,
  side,
  items,
  itemComponent,
  chatItems,
  chatItemComponent,
  folderComponent,
  footerComponent,
  problemDescriptionComponent,
  searchTerm,
  searchChatTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleChatCreateItem,
  handleCreateFolder,
  handleChatCreateFolder,
  handleDrop,
  handleChatDrop,
}: Props<T>) => {
  const { t } = useTranslation('promptbar');

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  return isOpen ? (
    <div>
      <div
        className={`fixed top-0 ${side}-0 z-40 flex h-full w-[260px] flex-col flex-col space-y-2 bg-[#202123] p-2 text-[14px] transition-all sm:relative sm:top-0`}
      >
        <div className="flex items-center"></div>

        <div className="flex-grow overflow-auto">
          <div className="flex pb-2">{problemDescriptionComponent}</div>

          {side === 'right' ? (
            <div>
              {chatItems ? (
                <button
                  className="tour-create-new-chat text-sidebar flex w-full flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
                  onClick={() => {
                    handleChatCreateItem();
                    handleSearchTerm('');
                  }}
                >
                  <IconPlus size={16} />
                  {addChatItemButtonTitle}
                </button>
              ) : null}

              {chatItems && chatItems.length > 0 ? (
                <div
                  style={{
                    overflowY: 'auto',
                  }}
                >
                  <div
                    className="pt-2 pb-2"
                    onDrop={handleChatDrop}
                    onDragOver={allowDrop}
                    onDragEnter={highlightDrop}
                    onDragLeave={removeHighlight}
                  >
                    {chatItemComponent}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    overflowY: 'auto',
                  }}
                >
                  <div className="mt-8 mb-10 select-none text-center text-white opacity-50">
                    <IconMistOff className="mx-auto mb-3" />
                    <span className="text-[14px] leading-normal">
                      {t('No data.')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
        {footerComponent}
      </div>

      <CloseSidebarButton onClick={toggleOpen} side={side} />
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};

export default Sidebar;
