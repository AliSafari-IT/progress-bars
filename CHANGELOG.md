# Changelog

All notable changes to `@asafarim/progress-bars` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.1] - 2026-09-19

### Documentation

- Added `CHANGELOG.md` with per-version release history
- README: new Changelog section linking to release notes

## [0.7.0] - 2026-09-19

### Added

- `ConcentricRingProgress` — multi-layered radial progress rings (2–4 rings) for compact
  multi-metric dashboards, with per-ring `value`/`tone`/`label`/`thickness`, `size`,
  `ringGap`, `center` content, and an `animate` toggle
- Component roadmap page in the demo now lists every shipped component
  (`Spinner`, `ProgressLabel`, `ProgressLegend`, `ProgressStack`, `ProgressTrack`)

### Documentation

- README: `ConcentricRingProgress` props and usage example

## [0.6.3] - 2026-08-29

### Changed

- Enhanced package metadata (keywords, description, funding)

### Fixed

- Demo SPA routing on GitHub Pages via `404.html` fallback

## [0.6.2] - 2026-08-29

### Added

- `ThresholdProgressBar` — threshold-based bar with smooth gradients, status colors,
  and target markers

### Fixed

- `CircularProgress` indeterminate animation

### Changed

- Standardized design-token color variable names; updated token usage docs
- Version line reset to `0.x` in preparation for a stable `1.0.0`

## [1.5.2] - 2026-08-27

### Added

- `StepProgress` marked as released, with dots/bars variants, vertical orientation,
  and clickable steps

## [1.5.0] - 2026-08-27

### Changed

- Accessibility improvements across components
- CI: GitHub Actions updated to pnpm 11.24.0 and Node.js 22.13.0

## [1.4.0] - 2026-08-27

### Added

- `VerticalProgress`, `SegmentedProgress`, `ProgressStack`, `Spinner`,
  `ProgressLabel`, `ProgressLegend` components

## [1.3.0] - 2026-01-19

### Added

- External links dropdown in demo global controls
- npm/GitHub badges and demo section in README

## [1.2.0] - 2026-01-19

### Fixed

- Demo `BrowserRouter` basename for GitHub Pages routing
- Demo build filter in the GitHub Actions workflow

## [1.1.0] - 2026-01-19

### Added

- Demo app configured for GitHub Pages deployment

## [1.0.0] - 2026-01-19

### Added

- Initial release: `LinearProgress`, `CircularProgress`, `ProgressTrack`
- Demo app and CI/CD pipeline

[0.7.1]: https://github.com/AliSafari-IT/progress-bars/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/AliSafari-IT/progress-bars/compare/v0.6.3...v0.7.0
[0.6.3]: https://github.com/AliSafari-IT/progress-bars/compare/v0.6.2...v0.6.3
[0.6.2]: https://github.com/AliSafari-IT/progress-bars/compare/v1.5.2...v0.6.2
[1.5.2]: https://github.com/AliSafari-IT/progress-bars/compare/v1.5.0...v1.5.2
[1.5.0]: https://github.com/AliSafari-IT/progress-bars/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/AliSafari-IT/progress-bars/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/AliSafari-IT/progress-bars/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/AliSafari-IT/progress-bars/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/AliSafari-IT/progress-bars/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/AliSafari-IT/progress-bars/releases/tag/v1.0.0
