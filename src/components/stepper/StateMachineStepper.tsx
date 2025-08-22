import { ArrowRightRounded } from '@mui/icons-material';

import * as styles from './StateMachineStepper.css';

import { Alert, Box, Button, Grid2, Typography } from '@mui/material';
import type { StateMachineStep } from '../../contexts/state-machine/types'
import { useStateMachine } from '../../contexts/state-machine/hooks/useStateMachine';
import { isDefined } from '../../utils';
import { SlotFooter } from '../../contexts/app-context/Slot';
import { useMemo } from 'react';
import { Modal } from '../../contexts/app-context/Modal';

type Store<StepId> = StepId extends string ? Partial<Record<StepId, unknown>> : never;

const hasStepValueStored = <StepId,>(step: StateMachineStep<StepId>, store: Store<StepId>) =>
    step.isDirty || step.isCompleted || (isDefined(store) && isDefined(store[step.id]));

const Step = <StepId,>({ step: { id, props, component: Component } }: { step: StateMachineStep<StepId> }) => (
    <Component id={id} {...props} />
);

const StateMachineTitle = <StepId,>({
    step,
    isFilled,
    isMobile,
}: {
    step: StateMachineStep<StepId>;
    isFilled: boolean;
    isMobile: boolean;
}) => (
    <Typography
        align={isMobile ? 'left' : 'center'}
        color={isFilled ? 'textPrimary' : 'textSecondary'}
    >
        {step.title}
    </Typography>
);

const WizardStepSeparator = () => (
    <span className={styles.stepsSeparator}>
        <ArrowRightRounded />
    </span>
);

const WizardModal = () => {
    const { modal } = useStateMachine();
    const { isMobile } = { isMobile: false }; //useViewport();

    if (!modal) return null;
    const { title, onClose, component, submit } = modal;
    return (
        <Modal
            opened
            title={title}
            // {...(size ? { size } : { fullscreen })}
            onClose={onClose}
            footer={
                submit && (
                    <Box>
                        <Button fullWidth={isMobile} disabled={submit.disabled} onClick={submit.onClick}>
                            {submit.text}
                        </Button>
                    </Box>
                )
            }
        >
            {component}
        </Modal>
    );
};

const WizardFooter = () => {
    const { step, goToNextStep } = useStateMachine();
    const { isMobile } = { isMobile: false } // useViewport();

    const handleOnSubmitStep = () => {
        if (!step?.onSubmit) return;
        step.onSubmit();
        goToNextStep();
    };

    return step && step.isDirty && step.ctaText && !!(step.formId || step.onSubmit) ? (
        <SlotFooter>
            <div className={styles.fullWidth}>
                <Grid2 sx={{ align: 'center' }}>
                    <Button disabled={!step?.isValid} fullWidth={isMobile} onClick={handleOnSubmitStep}>
                        {step.ctaText}
                    </Button>
                </Grid2>
            </div>
        </SlotFooter>
    ) : null;
};

export const Wizard = <StepId extends string>() => {
    const { step, steps, alert, setAlert, note, store } = useStateMachine<Store<StepId>, StepId>();
    const { isMobile, isDesktopOrBigger } = { isMobile: false, isDesktopOrBigger: false }; // useViewport();
    const grid = useMemo(() => steps?.filter(step => !step.fullscreen && !step.feedback && !step.bottom), [steps]);
    const bottom = useMemo(() => steps?.find(step => step.bottom), [steps]);

    const handleOnCloseAlert = (e: React.SyntheticEvent<Element, Event>) => {
        if (alert?.onClose) alert.onClose(e);
        else setAlert(undefined);
    };

    return (
        <>
            <div className={step?.feedback ? styles.confirmation : styles.content}>
                {!step?.fullscreen && !step?.feedback ? (
                    <Box top={isMobile && alert ? 0 : 24} bottom={isMobile ? 80 : 48}>
                        {alert && alert.title ? (
                            <Box bottom={16}>
                                <Alert {...alert} onClose={handleOnCloseAlert} />
                            </Box>
                        ) : null}
                        <Grid2 spacing={48}>
                            <Grid2 spacing={isMobile ? 0 : 48} >
                                <div className={styles.fullWidth}>
                                    <div className={styles.steps}>
                                        {grid.map((step: StateMachineStep<StepId>, index: number) => {
                                            const isFilled = hasStepValueStored(step, store);
                                            const showTitle = isDesktopOrBigger || hasStepValueStored(step, store);
                                            return (
                                                <div
                                                    key={`step-${step?.id}`}
                                                    className={styles.step}
                                                    ref={step.elementRef}
                                                >
                                                    <Grid2 spacing={16}>
                                                        {showTitle && step.title ? (
                                                            <StateMachineTitle
                                                                isFilled={isFilled}
                                                                step={step}
                                                                isMobile={isMobile}
                                                            />
                                                        ) : null}
                                                        {isDesktopOrBigger && index ? <WizardStepSeparator /> : null}
                                                        <Step step={step} />
                                                    </Grid2>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {bottom ? (
                                        <div className={styles.stepsBottom} ref={bottom.elementRef}>
                                            <Step step={bottom} />
                                        </div>
                                    ) : null}
                                </div>
                                <WizardFooter />
                            </Grid2>
                            {/* <WizardPortalOutlet /> */}
                        </Grid2>
                        {note && <Alert {...note} />}
                    </Box>
                ) : (
                    <>
                        <Step step={step} />
                        <WizardFooter />
                    </>
                )}
            </div>
            <WizardModal />
        </>
    );
};

Wizard.displayName = 'Wizard';
