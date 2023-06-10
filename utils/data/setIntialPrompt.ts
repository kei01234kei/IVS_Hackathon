import { Conversation } from '../../types/chat';
import { FolderInterface } from '../../types/folder';
import {
  OpenAIModelID,
  OpenAIModels,
  fallbackModelID,
} from '../../types/openai';
import { Prompt } from '../../types/prompt';

import { DEFAULT_TEMPERATURE } from '../app/const';

import { v4 as uuidv4 } from 'uuid';

const defaultModelId =
  (process.env.DEFAULT_MODEL &&
    Object.values(OpenAIModelID).includes(
      process.env.DEFAULT_MODEL as OpenAIModelID,
    ) &&
    (process.env.DEFAULT_MODEL as OpenAIModelID)) ||
  fallbackModelID;

export const initialFolders: FolderInterface[] = [];

export const initialConversations: Conversation[] = [];
