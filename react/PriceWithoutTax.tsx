import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useProduct } from 'vtex.product-context';
import { FormattedCurrency } from 'vtex.format-currency';

const CSS_HANDLES = [
    'priceWithoutTaxWrapper',
    'priceWithoutTaxLabel',
    'priceWithoutTaxValue',
] as const;

interface PriceWithoutTaxProps {
    classes?: Record<string, string>;
}

const PriceWithoutTax: React.FC<PriceWithoutTaxProps> = ({ classes }) => {
    const { handles } = useCssHandles(CSS_HANDLES, { classes });
    const productContext = useProduct();
    const product = productContext?.product;
    const seller = product?.items?.[0]?.sellers?.[0];
    const sellingPrice = seller?.commertialOffer?.Price ?? 0;
    const priceWithoutTax = sellingPrice / 1.21;

    if (!product || !seller) {
        return <div className={handles.priceWithoutTaxWrapper}>Cargando...</div>;
    }

    return (
        <div className={handles.priceWithoutTaxWrapper}>
            <span className={handles.priceWithoutTaxLabel}>
                Precio sin impuestos nacionales:
            </span>
            <span className={handles.priceWithoutTaxValue}>
                <FormattedCurrency value={priceWithoutTax} />
            </span>
        </div>
    );
};

export default PriceWithoutTax;
