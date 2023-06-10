import { Dispatch, createContext } from 'react';



import { ActionType } from '@/hooks/useCreateReducer';



import { Conversation } from '@/types/chat';
import { Prompt } from '@/types/prompt';



import { PromptbarInitialState } from './Promptbar.state';
import { PluginKey } from '@/types/plugin';
import { SupportedExportFormats } from '@/types/export';


export interface PromptbarContextProps {
  state: PromptbarInitialState;
  dispatch: Dispatch<ActionType<PromptbarInitialState>>;
  handleCreatePrompt: () => void;
  handleDeletePrompt: (prompt: Prompt) => void;
  handleUpdatePrompt: (prompt: Prompt) => void;
}

const PromptbarContext = createContext<PromptbarContextProps>(undefined!);

export default PromptbarContext;
