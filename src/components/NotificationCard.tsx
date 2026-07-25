'use client';
import React, { forwardRef } from 'react';
import './NotificationCard.css';
import { CardProps } from './CardSwap';

interface NotificationProps extends CardProps {
  appName: string;
  title: string;
  time: string;
  message: string;
  icon?: string;
  badge?: React.ReactNode;
}

export const NotificationCard = forwardRef<HTMLDivElement, NotificationProps>(({
  appName,
  title,
  time,
  message,
  icon,
  badge,
  customClass,
  style,
  ...rest
}, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className={`notification-card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
      style={{ ...style }}
    >
      <div className="notification-inner">
        <div className="notification-icon-wrapper">
          {icon ? (
            <img src={icon} alt={appName} className="notification-icon" />
          ) : (
            <div className="notification-icon-placeholder" />
          )}
          {badge && (
            <div className="notification-badge">{badge}</div>
          )}
        </div>
        
        <div className="notification-content">
          <div className="notification-header">
            <span className="notification-title">
              <strong>{appName}</strong> | {title}
            </span>
            <span className="notification-time">{time}</span>
          </div>
          <div className="notification-message">{message}</div>
        </div>
      </div>
    </div>
  );
});

NotificationCard.displayName = 'NotificationCard';
