# FiraGO web fonts

Source: https://github.com/bBoxType/FiraGO, official 1.001 WOFF2 Roman release.
Original files: `Fonts/FiraGO_WEB_1001/Roman/FiraGO-{Regular,Medium,SemiBold,Bold}.woff2`.
The unmodified originals and upstream `FiraGO-OFL.txt` are retained here.

The upstream fonts contain Mtavruli outlines as `.case` alternates but do not
encode U+1C90–U+1CBA / U+1CBD–U+1CBF. `scripts/prepare-firago.py` adds those
46 Unicode mappings using the existing outlines in each weight. It does not
redraw, scale, or substitute glyphs. Source fonts remain unchanged.

The generated derivative is internally renamed **Hub UI** (files `HubUI-*.woff2`)
to distinguish it from upstream and avoid reserved-name ambiguity. The app's
CSS family alias is **FiraGO**. Both original and derived fonts remain under
the SIL Open Font License 1.1; original copyright/license metadata is retained.

Rebuild with Python and `fonttools[woff]` installed:
`python scripts/prepare-firago.py`
