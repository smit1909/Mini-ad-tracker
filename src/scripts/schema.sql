-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clicks Table
CREATE TABLE IF NOT EXISTS clicks (
    id SERIAL PRIMARY KEY,
    click_id UUID NOT NULL UNIQUE,
    source VARCHAR(255) NOT NULL,
    campaign_id VARCHAR(255),
    ad_id VARCHAR(255),
    ip VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Conversions Table
CREATE TABLE IF NOT EXISTS conversions (
    id SERIAL PRIMARY KEY,
    click_id UUID REFERENCES clicks(click_id),
    event VARCHAR(255) NOT NULL,
    value DECIMAL(10, 2),
    currency VARCHAR(3),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster reporting
CREATE INDEX IF NOT EXISTS idx_clicks_source ON clicks(source);
CREATE INDEX IF NOT EXISTS idx_clicks_campaign ON clicks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_conversions_click_id ON conversions(click_id);
