#!/bin/bash
set -e

ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
  SUFFIX="darwin-arm64"
else
  SUFFIX="darwin-x64"
fi

VERSION="v22.14.0"
URL="https://nodejs.org/dist/${VERSION}/node-${VERSION}-${SUFFIX}.tar.gz"
DEST="$HOME/.local"
NODE_DIR="${DEST}/node-${VERSION}-${SUFFIX}"

echo "Detected arch: $ARCH"
echo "Downloading Node.js ${VERSION} for ${SUFFIX}..."

mkdir -p "$DEST"
curl -fsSL "$URL" -o /tmp/node.tar.gz
tar xzf /tmp/node.tar.gz -C "$DEST"

# Add to PATH in .zshrc if not already there
if ! grep -q "node-${VERSION}-${SUFFIX}" "$HOME/.zshrc" 2>/dev/null; then
  echo "export PATH=\"${NODE_DIR}/bin:\$PATH\"" >> "$HOME/.zshrc"
fi

export PATH="${NODE_DIR}/bin:$PATH"

echo ""
echo "Node: $(node --version)"
echo "npm:  $(npm --version)"
echo "Done. Node is ready."
