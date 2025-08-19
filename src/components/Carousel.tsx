'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '@/theme/theme';

interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  infinite?: boolean;
  className?: string;
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${theme.borderRadius.md};
`;

const CarouselTrack = styled.div<{ $currentIndex: number; $totalItems: number }>`
  display: flex;
  transition: transform ${theme.transitions.medium};
  transform: translateX(-${({ $currentIndex, $totalItems }) => ($currentIndex / $totalItems) * 100}%);
  width: ${({ $totalItems }) => $totalItems * 100}%;
`;

const CarouselItemWrapper = styled.div`
  flex: 1;
  min-width: 0;
  padding: 0 ${theme.spacing.sm};
`;

const ArrowButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => $direction === 'left' 
    ? `left: ${theme.spacing.md};` 
    : `right: ${theme.spacing.md};`}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.colors.text.white};
  transition: ${theme.transitions.fast};
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.md};
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => 
    $active ? theme.colors.text.primary : theme.colors.text.tertiary};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${({ $active }) => 
      $active ? theme.colors.text.primary : theme.colors.text.secondary};
  }
`;

const LeftArrow = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
  </svg>
);

const RightArrow = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
);

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  infinite = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const goToNext = () => {
    if (infinite || currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const goToPrevious = () => {
    if (infinite || currentIndex > 0) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const startAutoPlay = useCallback(() => {
    if (autoPlay && !intervalRef.current) {
      intervalRef.current = setInterval(goToNext, interval);
    }
  }, [autoPlay, goToNext, interval]);

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isPlaying, currentIndex, interval, startAutoPlay]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  const handleMouseEnter = () => {
    if (autoPlay) {
      stopAutoPlay();
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      startAutoPlay();
    }
  };

  if (totalItems === 0) return null;

  return (
    <CarouselContainer 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselTrack $currentIndex={currentIndex} $totalItems={totalItems}>
        {childrenArray.map((child, index) => (
          <CarouselItemWrapper key={index}>
            {child}
          </CarouselItemWrapper>
        ))}
      </CarouselTrack>

      {showArrows && totalItems > 1 && (
        <>
          <ArrowButton
            $direction="left"
            onClick={goToPrevious}
            disabled={!infinite && currentIndex === 0}
            aria-label="Previous slide"
          >
            <LeftArrow />
          </ArrowButton>
          <ArrowButton
            $direction="right"
            onClick={goToNext}
            disabled={!infinite && currentIndex === totalItems - 1}
            aria-label="Next slide"
          >
            <RightArrow />
          </ArrowButton>
        </>
      )}

      {showDots && totalItems > 1 && (
        <DotsContainer>
          {childrenArray.map((_, index) => (
            <Dot
              key={index}
              $active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
