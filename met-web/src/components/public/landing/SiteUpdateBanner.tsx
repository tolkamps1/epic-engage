import React from 'react';
import { Box } from '@mui/material';
import { MetHeader4, MetParagraph } from 'components/shared/common';
import {
    layoutBorderRadiusMedium,
    surfaceColorBackgroundDarkBlue,
    surfaceColorBackgroundInfo,
    typographyColorPrimary,
    typographyFontSizeBody,
    typographyFontSizeH5,
    typographyFontWeightsBold,
} from 'styles/designTokens';
import { useAppTranslation } from 'hooks';
import { AppConfig } from 'config';

export const SiteUpdateBanner = () => {
    const { t: translate } = useAppTranslation();

    if (!AppConfig.featureFlags.siteUpdateBanner) {
        return null;
    }

    return (
        <Box
            role="status"
            data-testid="site-update-banner"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '8px',
                width: '100%',
                padding: '16px 24px',
                borderRadius: layoutBorderRadiusMedium,
                border: `1px solid ${surfaceColorBackgroundDarkBlue}`,
                backgroundColor: surfaceColorBackgroundInfo,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                <MetHeader4
                    bold
                    component="h2"
                    sx={{
                        color: typographyColorPrimary,
                        fontSize: typographyFontSizeH5,
                        fontWeight: typographyFontWeightsBold,
                        lineHeight: '32px',
                        letterSpacing: '-0.4px',
                    }}
                >
                    {translate('landing.siteUpdateBanner.title')}
                </MetHeader4>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '16px',
                    alignSelf: 'stretch',
                }}
            >
                <MetParagraph
                    sx={{
                        color: typographyColorPrimary,
                        fontSize: typographyFontSizeBody,
                        lineHeight: '24px',
                        letterSpacing: '-0.32px',
                    }}
                >
                    {translate('landing.siteUpdateBanner.description')}
                </MetParagraph>
            </Box>
        </Box>
    );
};

export default SiteUpdateBanner;
