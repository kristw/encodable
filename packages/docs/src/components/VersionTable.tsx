import React, { CSSProperties } from 'react';

interface Package {
  name: string;
  codePath: string;
  docPath?: string;
}

export type VersionTableProps = {
  packages: Package[];
  baseUrl?: string;
};

const tdStyle: CSSProperties = {
  fontSize: '0.9em',
  paddingLeft: 0,
  paddingRight: 8,
  paddingTop: 4,
  paddingBottom: 4,
};

const tdImgStyle: CSSProperties = {
  paddingLeft: 0,
  paddingRight: 8,
  paddingTop: 6,
  paddingBottom: 0,
};

const linkStyle: CSSProperties = {
  textDecoration: 'none',
  color: '#0B5FFF',
};

const thStyle: CSSProperties = { ...tdStyle, textAlign: 'left' };

export default function VersionTable({
  packages,
  baseUrl = 'https://github.com/kristw/encodable',
}: VersionTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle}>Package</th>
          <th style={thStyle}>Version</th>
          <th style={thStyle} />
          <th style={thStyle} />
          <th style={thStyle} />
        </tr>
      </thead>
      <tbody>
        {packages.map(({ name, codePath, docPath }) => (
          <tr key={name}>
            <td style={tdStyle}>
              <a style={linkStyle} href={`https://www.npmjs.com/package/${name}`}>
                {name}
              </a>
            </td>
            <td style={tdImgStyle}>
              <a style={linkStyle} href={`https://www.npmjs.com/package/${name}`}>
                <img
                  alt="npm badge"
                  src={`https://img.shields.io/npm/v/${name}.svg?style=flat-square`}
                />
              </a>
            </td>
            <td style={tdStyle}>
              <a style={linkStyle} href={`${baseUrl}/tree/master/${codePath}`}>
                source
              </a>
            </td>
            <td style={tdStyle}>
              <a style={linkStyle} href={docPath}>
                docs
              </a>
            </td>
            <td style={tdStyle}>
              <a style={linkStyle} href={`${baseUrl}/tree/master/${codePath}/CHANGELOG.md`}>
                changelog
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
