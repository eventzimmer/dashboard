# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- added automatic latitude longitude fill provided by OpenStreetMap
- added RSS source type

### Changed
- make table-layout fixed and break table cells for proposed events
- use staging auth by default

### Fixed
- added flex-wrap to pagination elements so they are responsive
- sort proposed events by starts_at

## [0.2.0] - 13.10.2019
### Added
- added proposed event accept functionality
- added proposed events display

### Fixed
- allow arbitrary precision in langitude / longitude input fields

## [0.1.0] - 10.10.2019
### Added
- added Netlify deploy and rewrite
- add persistent login and renew
- add logout button
- added Auth0 redirect-based login
- added Login page (landing)
- added Organizer dashboard
- added Profile component
- added Locations component
- added Sources component
- add basic events chart (currently disabled)
