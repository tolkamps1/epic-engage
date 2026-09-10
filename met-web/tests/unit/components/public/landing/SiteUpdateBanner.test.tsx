import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SiteUpdateBanner } from 'components/public/landing/SiteUpdateBanner';
import * as hooks from 'hooks';
import { AppConfig } from 'config';

jest.mock('hooks', () => ({
    ...jest.requireActual('hooks'),
    useAppTranslation: jest.fn(),
}));

jest.mock('config', () => ({
    ...jest.requireActual('config'),
    AppConfig: {
        ...jest.requireActual('config').AppConfig,
        featureFlags: { siteUpdateBanner: true },
    },
}));

const mockTranslation = (copy: Record<string, string>) => {
    (hooks.useAppTranslation as jest.Mock).mockReturnValue({
        t: (key: string) => copy[key] ?? `default:${key}`,
    });
};

const setBannerEnabled = (enabled: boolean) => {
    AppConfig.featureFlags.siteUpdateBanner = enabled;
};

describe('SiteUpdateBanner', () => {
    beforeEach(() => setBannerEnabled(true));

    it('renders the title and description from the locale file', () => {
        mockTranslation({
            'landing.siteUpdateBanner.title': 'Updates to viewing public feedback',
            'landing.siteUpdateBanner.description': 'We have updated how we share results.',
        });

        render(<SiteUpdateBanner />);

        expect(screen.getByTestId('site-update-banner')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Updates to viewing public feedback');
        expect(screen.getByText('We have updated how we share results.')).toBeInTheDocument();
    });

    it('renders nothing when the feature flag is off', () => {
        setBannerEnabled(false);
        mockTranslation({
            'landing.siteUpdateBanner.title': 'Updates to viewing public feedback',
            'landing.siteUpdateBanner.description': 'We have updated how we share results.',
        });

        render(<SiteUpdateBanner />);

        expect(screen.queryByTestId('site-update-banner')).not.toBeInTheDocument();
    });
});
