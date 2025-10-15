// src/components/layout/SectionContainer.tsx
import { Container, Box, BoxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SectionContainerProps extends BoxProps {
  title?: string;
  content?: string;
  items?: { icon?: string; title: string; description: string }[];
  children?: ReactNode;
  textAlign?: React.ComponentProps<typeof Typography>['align']
}

const SectionContainer = ({ children, sx, title, content, items, textAlign = 'left', ...props }: SectionContainerProps) => {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, ...sx }} {...props}>
      {title && (
        <Typography variant="h2" align={textAlign} fontWeight={700} gutterBottom>
          {title}
        </Typography>
      )}
      {
        content && (
          <Typography variant="h6" align={textAlign} color="text.secondary" sx={{ maxWidth: '600px', mx: textAlign === 'center' ? 'auto' : 0, mb: 8 }}>
            {content}
          </Typography>
        )
      }
      <Container maxWidth="lg">
        {!items && children}
        {
          !children && items && (
            <Box display="flex" flexDirection="column" gap={4}>
              {items.map((it, i) => (
                <Box key={i} display="flex" gap={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      opacity: 0.15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {it.icon}
                  </Box>
                  <Box>
                    <Typography fontWeight={600}>{it.title}</Typography>
                    <Typography color="text.secondary">{it.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )
        }
      </Container>
    </Box>
  );
};

export default SectionContainer;