# Analytics

PostHog collects pageviews and explicit product events. Google Analytics keeps the existing acquisition history. Both are enabled only on the canonical production hostname in `src/lib/site.ts`; localhost and deployment previews send neither.

| Event | Trigger | Properties |
| --- | --- | --- |
| `layout_detection_started` | First accepted key in a guided check | `method: guided_keys` |
| `layout_detection_completed` | Guided check completes, or visitor chooses family-only completion | `method`, `result` (layout/family ID or `unknown`), `match_level` (`variant`, `family`, `unknown`) |
| `layout_selected` | A different layout is selected | `layout`, `previous_layout` |
| `practice_started` | First accepted character or space in a practice run | `layout`, `practice_id`, `active_seconds`, `character_count` |
| `practice_engaged` | Once after 30 cumulative seconds of active typing in that run | Same aggregate practice properties |
| `hints_toggled` | Hints are switched on or off | `layout`, `enabled` |
| `recommendations_opened` | The recommendations are expanded | `layout`, `placement` |
| `affiliate_link_clicked` | A product link is activated, including middle click | `layout`, `product_id`, `merchant`, `placement` |

All events carry `analytics_site: keyboard-layout-tester`, `analytics_version: 1`, and `is_internal`. The SDK supplies session, device, referrer and campaign context. Product IDs remain stable if copy changes. Affiliate clicks measure outbound interest; only the merchant can confirm orders and commission.

The layout detector keeps the latest character per physical key and Shift layer only in component memory and blocks the entire check area from session replay. Six initial positions identify a layout family, followed by distinguishing positions when needed for a supported variant. Input can arrive in any order; extra keys fill the diagram and can help distinguish variants. Held-key repeats do not advance progress. Clicking a diagram key selects a position without recording a sample. Completion is emitted at most once per run, including when a visitor finishes with the family only. Its events contain only the method, result ID and match level, never raw keys, characters, or sample arrays. Owner/QA exclusions use the existing persistent internal marker and preview-host policy. Production reporting must filter `is_internal != true`; production delivery will need verification after release.

## Practice definition

A run starts with a mapped character or space. Repeated held keys, composition, shortcuts and navigation keys do not count. A layout change or 30 minutes without accepted input starts a new run; reselecting the same layout does not. A page reload also starts a new run.

Active time counts intervals of at most five seconds between accepted inputs. Longer gaps contribute zero, and leaving the tester, hiding the page or blurring the window pauses the interval. This is a conservative estimate of active typing, not elapsed time on the page. Multiple practice runs can occur in one PostHog session.

The tracker holds only counts, timing and a random run ID in memory. It never receives raw keys or typed text and emits at most two practice events per run. Autocapture is disabled. Both typed text and the virtual keyboard are blocked from session replay; inputs are masked and console recording is disabled.

## Verification and internal visits

- Add `?analytics=internal` to mark this browser as internal. The marker persists in local storage across visits. Use this bookmark for owner checks.
- `?analytics=debug` also marks internal traffic and logs event metadata in the console. On localhost this makes verification possible without sending analytics remotely.
- For a labeled production check, use `?analytics=debug&analytics_test=release-1`. The optional ID accepts up to 64 letters, digits, underscores or hyphens.
- Internal production events reach PostHog with `is_internal: true` so delivery can be checked, but Google Analytics and session replay are disabled. Dashboard insights must exclude these events.
- `?analytics=external` clears the marker. A new browser or cleared storage requires marking again. If storage is blocked, use the internal query parameter on each visit.

Control parameters are removed from the captured current URL. Campaign UTMs are preserved. Analytics failures must not interrupt typing or outbound links. The SDK loads asynchronously; up to 50 early product events can wait for initialization.

Run `npm run test:analytics` with Node 22.6+ for tracker, input, privacy-marker and hostname-policy checks, then `npm run build`. Verify browser actions locally using debug mode, and verify labeled production events in PostHog after deployment. Do not treat test merchant visits as real customer demand.

## Reporting and domain changes

Keep separate session funnels for pageview → practice started → practice engaged and pageview → recommendations opened → affiliate clicked. Break down practice by layout and clicks by product. Use unique visitors/sessions alongside totals to avoid treating repeat interactions as additional people. Returning-user reports use anonymous browser identity, so clearing storage or switching devices affects retention.

New event metrics begin with this release; earlier pageviews cannot reconstruct practice or affiliate events. Compare small samples descriptively. Merchant commissions and payments remain separate from PostHog metrics.

The canonical production URL is `https://keyboardlayout.app/`. Metadata, sitemap and analytics use `src/lib/site.ts`; `NEXT_PUBLIC_SITE_URL` can override it at build time. Vercel redirects the legacy `keyboard.experimental.software` hostname and `www.keyboardlayout.app` permanently to the canonical domain. Keep those redirects for at least one year, preferably indefinitely. The analytics project and event names remain unchanged, and dashboard hostname filters include both the legacy and current domains to preserve historical reporting.

## Shareable layout routes

`/`, `/dvorak`, and `/colemak` select QWERTY, Dvorak, and Colemak respectively. The shared tester layout preserves practice text, hints, and recommendations across client-side navigation. PostHog captures one pageview per URL transition, including Back/Forward navigation, with the route and initial layout. Route changes emit `layout_selected`; a direct load does not imply a user selection. The first practice event uses the selected route's layout. Duplicate effect calls do not double-count a pageview, and queued pageviews retain the URL they originally described. Localhost and preview hosts remain excluded from ingestion. GA retains its existing property and history-change measurement configuration.

Content pages use their article titles in pageviews and set `page_type=article`; `/learn` uses `page_type=guides`. Simulator routes use `page_type=simulator` and include the selected `layout`. Reading a guide does not imply a QWERTY selection and does not emit practice events. The article bodies are rendered on the server and are not imported into the analytics client.
