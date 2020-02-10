let
  pkgs = import (builtins.fetchGit {
    url = git://github.com/NixOS/nixpkgs-channels;
    ref = "nixos-unstable";
    rev = "d5e9b7d5a7c011605d7215b88efd70ccf8643ede";
  }) {};
in
  pkgs.mkShell {
    buildInputs = [
      pkgs.nodejs-slim
      pkgs.yarn
      pkgs.jq
    ];
    shellHook = ''
        export PATH="./node_modules/.bin/:$PATH"
    '';
  }
