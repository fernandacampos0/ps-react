import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./styles.module.scss";
import { usePopper } from 'react-popper';

/**
 * Versão final, amém! xD
 * Serviu de estudos pra usar o popper
 * @param {*} props
 * @returns
 */

const Tooltip = (props) => {
  const showEvents = props.showEvents || ['mouseenter'];
  const hideEvents = props.hideEvents || ['mouseleave','blur'];
  let timeout;

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [delay, setDelay] = React.useState(false);

  const defaultModifiers = React.useMemo(() => [
    {
      name: 'arrow', options: {
        element: arrowElement
      }
    },
    {
      name: 'offset', options: {
        offset: [0, 10],
      },
    },
  ]);

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement || 'top',
    strategy : props.strategy || 'fixed',
    modifiers: defaultModifiers.concat(props.modifiers || []),
  });

  const show = () => {
    if (visible) return;
    timeout = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeout);
    setTimeout(() => setVisible(false), 10);
  };


  React.useEffect(() => {
    if (!referenceElement) return;
    showEvents.forEach((event) => {
      referenceElement.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
      referenceElement.addEventListener(event, hide);
    });

    return () => {
      showEvents.forEach((event) => {
        referenceElement.removeEventListener(event, show);
      });

      hideEvents.forEach((event) => {
        referenceElement.removeEventListener(event, hide);
      });

      clearTimeout(timeout);
    }
  },[referenceElement])

  React.useEffect(() => {
    setDelay((showEvents.indexOf('mouseenter') > -1 || showEvents.indexOf('focus') > -1) ? (props.delay || 0) : 0);
  },[])


  return (
    <>
      {React.cloneElement(props.children, { ref: setReferenceElement })}
      {(visible || props.show) && ReactDOM.createPortal(
        <div ref={setPopperElement} style={popperStyles.popper} className={styles.tooltipContainer} {...attributes.popper}>
          {props.text}
          <div ref={setArrowElement} style={popperStyles.arrow} className={styles.tooltipArrow} />
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;