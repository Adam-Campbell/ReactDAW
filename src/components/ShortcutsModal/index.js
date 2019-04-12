import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Switch from '../Switch';
import {
    categoryTypes, 
    globalShortcutsData,
    composerShortcutsData,
    pianoRollShortcutsData,
    pianoRollWithSelectedNotesShortcutsData
} from './shortcutsData';

class ShortcutsModal extends Component {

    state = {
        categoryShowing: categoryTypes.global
    };

    updateCategoryShowing = (newCategory) => {
        this.setState(state => ({
            categoryShowing: newCategory
        }));
    }

    

    renderTable = (tableData) => {
        return (
            <table className="shortcuts-table">
                {tableData.caption && <caption className="shortcuts-table__caption">{tableData.caption}</caption>} 
                <thead className="shortcuts-table__head">
                    <tr>
                        <th 
                            className="shortcuts-table__header-cell--left" 
                            scope="col"
                        >Shortcut</th>
                        <th 
                            className="shortcuts-table__header-cell--right" 
                            scope="col"
                        >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.data.map((dataPair, index) => (
                        <tr className="shortcuts-table__row" key={index}>
                            <td className="shortcuts-table__data-cell">{dataPair.shortcut}</td>
                            <td className="shortcuts-table__data-cell">{dataPair.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    };

    renderPianoRollShortcuts = () => {
        return (
            <>
                {this.renderTable(pianoRollShortcutsData)}
                {this.renderTable(pianoRollWithSelectedNotesShortcutsData)}
            </>
        );
    }

    renderShortcuts = (category) => {
        switch (category) {
            case categoryTypes.global:
                return this.renderTable(globalShortcutsData);
            case categoryTypes.composer:
                return this.renderTable(composerShortcutsData);
            case categoryTypes.pianoRoll:
                return this.renderPianoRollShortcuts();
            default:
                return this.renderTable(globalShortcutsData);
        }
    }

    render() {
        const { categoryShowing } = this.state;
        return (
            <div className="shortcuts-modal__container">
                <button
                    className="button main-color"
                    onClick={this.props.closeModal}
                >X</button>
                <Switch 
                    value={categoryShowing}
                    handleChange={this.updateCategoryShowing}
                    rowDescription="Select shortcut category to view"
                    optionsData={[
                        {
                            name: 'shortcuts-modal-categories',
                            value: categoryTypes.global,
                            id: `shortcuts-modal-categories-${categoryTypes.global}`,
                            text: 'Global'
                        },
                        {
                            name: 'shortcuts-modal-categories',
                            value: categoryTypes.composer,
                            id: `shortcuts-modal-categories-${categoryTypes.composer}`,
                            text: 'Composer'
                        },
                        {
                            name: 'shortcuts-modal-categories',
                            value: categoryTypes.pianoRoll,
                            id: `shortcuts-modal-categories-${categoryTypes.pianoRoll}`,
                            text: 'Piano Roll'
                        }
                    ]}
                />
                {this.renderShortcuts(categoryShowing)}
            </div>
        );
    }
}

export default connect(
    undefined,
    {
        closeModal: ActionCreators.closeModal
    } 
)(ShortcutsModal);