import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiChevronDown } from 'react-icons/hi';
import { StyledButton } from '../styledComponents/navBarStyle';
import { NavContainer } from './NavContainer';

export const NavButton = ({
  content,
  fetching,
  btnStyle = undefined,
  ...props
}) => {
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const node = useRef(null);

  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) return;
    if (!activeButton) setActiveButton(false);
  };

  return (
    <Button
      onClick={async () => {
        setActiveButton(!activeButton);
      }}
      isActive={activeButton}
      variant="link"
      ref={node}
      {...StyledButton(btnStyle)}
    >
      {content} <Icon as={HiChevronDown} pl="2px" mt="3px" />
      <NavContainer display={activeButton} {...props} />
    </Button>
  );
};
