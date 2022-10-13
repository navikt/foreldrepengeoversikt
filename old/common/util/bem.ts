import classNames from 'classnames';

export interface BEMHelperProps {
    block: string;
    element: (e?: string, m?: string) => string;
    modifier: (m?: string) => string;
    modifierConditional: (m: string | undefined, condition: boolean | undefined) => string | undefined;
    child: (c: string) => BEMHelperProps;
    classNames: any;
}

const BEMHelper = (cls: string): BEMHelperProps => ({
    block: cls,
    element: (e?: string, m?: string) => `${cls}__${e}${m ? ` ${cls}__${e}--${m}` : ''}`,
    modifier: (m?: string) => `${cls}--${m}`,
    modifierConditional: (m: string | undefined, condition: boolean | undefined) =>
        condition === true && m !== undefined ? `${cls}--${m}` : undefined,
    child: (c: string) => BEMHelper(BEMHelper(cls).element(c)),
    classNames,
});

export default BEMHelper;
