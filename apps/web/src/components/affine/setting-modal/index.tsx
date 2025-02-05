import {
  SettingModal as SettingModalBase,
  type SettingModalProps,
} from '@affine/component/setting-components';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { ContactWithUsIcon } from '@blocksuite/icons';
import type React from 'react';
import { useCallback } from 'react';

import { AccountSetting } from './account-setting';
import {
  GeneralSetting,
  type GeneralSettingKeys,
  useGeneralSettingList,
} from './general-setting';
import { SettingSidebar } from './setting-sidebar';
import { settingContent } from './style.css';
import { WorkspaceSetting } from './workspace-setting';

type ActiveTab = GeneralSettingKeys | 'workspace' | 'account';
export type SettingProps = {
  activeTab: ActiveTab;
  workspaceId: string | null;
  onSettingClick: (params: {
    activeTab: ActiveTab;
    workspaceId: string | null;
  }) => void;
};
export const SettingModal: React.FC<SettingModalProps & SettingProps> = ({
  open,
  setOpen,
  activeTab = 'appearance',
  workspaceId = null,
  onSettingClick,
}) => {
  const t = useAFFiNEI18N();

  const generalSettingList = useGeneralSettingList();

  const onGeneralSettingClick = useCallback(
    (key: GeneralSettingKeys) => {
      onSettingClick({
        activeTab: key,
        workspaceId: null,
      });
    },
    [onSettingClick]
  );
  const onWorkspaceSettingClick = useCallback(
    (workspaceId: string) => {
      onSettingClick({
        activeTab: 'workspace',
        workspaceId,
      });
    },
    [onSettingClick]
  );
  const onAccountSettingClick = useCallback(() => {
    onSettingClick({ activeTab: 'account', workspaceId: null });
  }, [onSettingClick]);

  return (
    <SettingModalBase open={open} setOpen={setOpen}>
      <SettingSidebar
        generalSettingList={generalSettingList}
        onGeneralSettingClick={onGeneralSettingClick}
        onWorkspaceSettingClick={onWorkspaceSettingClick}
        selectedGeneralKey={activeTab}
        selectedWorkspaceId={workspaceId}
        onAccountSettingClick={onAccountSettingClick}
      />

      <div data-testid="setting-modal-content" className={settingContent}>
        <div className="wrapper">
          <div className="content">
            {activeTab === 'workspace' && workspaceId ? (
              <WorkspaceSetting key={workspaceId} workspaceId={workspaceId} />
            ) : null}
            {generalSettingList.find(v => v.key === activeTab) ? (
              <GeneralSetting generalKey={activeTab as GeneralSettingKeys} />
            ) : null}
            {activeTab === 'account' ? <AccountSetting /> : null}
          </div>
          <div className="footer">
            <ContactWithUsIcon />
            <a href="https://community.affine.pro/home" target="_blank">
              {t[
                'Need more customization options? You can suggest them to us in the community.'
              ]()}
            </a>
          </div>
        </div>
      </div>
    </SettingModalBase>
  );
};
