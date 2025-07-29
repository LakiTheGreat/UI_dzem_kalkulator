import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import {
  InputAdornment,
  Stack,
  styled,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  QuickFilterTrigger,
  Toolbar,
  ToolbarButton,
} from '@mui/x-data-grid';

type OwnerState = {
  expanded: boolean;
};

const StyledQuickFilter = styled(QuickFilter)({
  display: 'grid',
  alignItems: 'center',
});

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity']),
  })
);

const StyledTextField = styled(TextField)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  gridArea: '1 / 1',
  overflowX: 'clip',
  width: ownerState.expanded ? 260 : 'var(--trigger-width)',
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(['width', 'opacity']),
}));

export default function CustomToolbar() {
  return (
    <Toolbar>
      <Stack direction='row' sx={{ width: '100%' }} alignItems='center'>
        <StyledQuickFilter>
          <QuickFilterTrigger
            render={(triggerProps, state) => (
              <Tooltip title='Search' enterDelay={0}>
                <StyledToolbarButton
                  {...triggerProps}
                  ownerState={{ expanded: state.expanded }}
                  color='default'
                  aria-disabled={state.expanded}
                >
                  <SearchIcon fontSize='small' />
                </StyledToolbarButton>
              </Tooltip>
            )}
          />
          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <StyledTextField
                {...controlProps}
                ownerState={{ expanded: state.expanded }}
                inputRef={ref}
                aria-label='Search'
                placeholder='Search...'
                size='small'
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon fontSize='small' />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position='end'>
                        <QuickFilterClear
                          edge='end'
                          size='small'
                          aria-label='Clear search'
                          material={{ sx: { marginRight: -0.75 } }}
                        >
                          <CancelIcon fontSize='small' />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input,
                  },
                  ...controlProps.slotProps,
                }}
              />
            )}
          />
        </StyledQuickFilter>
      </Stack>
    </Toolbar>
  );
}
